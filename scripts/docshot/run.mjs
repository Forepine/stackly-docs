/**
 * Screenshots for the docs, taken from the real Stackly app with demo data.
 *
 * Every API call the app makes is answered from the spec's mocks (nothing reaches a real server),
 * so screenshots always show the same demo workspace and never real customer data.
 *
 *   1. Run the app:          cd ../stackly-react && npm run dev        (http://localhost:5173)
 *   2. Take screenshots:     node scripts/docshot/run.mjs links events  (spec names, or "all")
 *
 * Options: --base http://localhost:5173  --port 9333  --only <shot name>
 * Output:  static/img/docs/<module>/<shot>.webp
 * Calls without a mock get an empty list and are printed, so you can add a mock for them.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { commonMocks, demoUser } from './fixtures.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args.splice(i, 2)[1] : fallback; };
const base = opt('base', 'http://localhost:5173');
const port = Number(opt('port', 9333));
const only = opt('only', null);
let specNames = args.length ? args : ['all'];
if (specNames.includes('all')) specNames = fs.readdirSync(path.join(here, 'specs')).filter((f) => f.endsWith('.mjs')).map((f) => f.replace('.mjs', ''));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('Google Chrome not found');

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'docshot-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--force-color-profile=srgb', '--lang=en-IN', 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { chrome.kill(); } catch { /* gone */ } try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* fine */ } };
process.on('exit', cleanup);

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl; } catch { await sleep(200); }
}
if (!wsUrl) throw new Error('Chrome did not start');

const sock = new WebSocket(wsUrl);
await new Promise((r) => (sock.onopen = r));
let seq = 0;
const pending = new Map();
const listeners = [];
sock.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method) listeners.forEach((l) => l(m));
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.error ? { error: m.error } : m.result); pending.delete(m.id); }
};
const send = (method, params = {}, sessionId) => new Promise((res) => { const i = ++seq; pending.set(i, res); sock.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) })); });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);
const evaluate = async (expression) => {
    const r = await s('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(`eval failed: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    return r.result?.value;
};
await s('Page.enable');
await s('Runtime.enable');
await s('Fetch.enable', { patterns: [{ urlPattern: '*', resourceType: 'XHR' }, { urlPattern: '*', resourceType: 'Fetch' }, { urlPattern: '*', resourceType: 'EventSource' }] });

const debug = process.env.DOCSHOT_DEBUG;
if (debug) listeners.push((m) => {
    if (m.method === 'Runtime.exceptionThrown') console.log('  [page error]', m.params.exceptionDetails.exception?.description?.split('\n')[0]);
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') console.log('  [console]', m.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 300));
});

let mocks = [];
const unmatched = new Set();
listeners.push(async (m) => {
    if (m.method !== 'Fetch.requestPaused') return;
    const { request, requestId } = m.params;
    const url = new URL(request.url);
    // Live updates (SSE) are off in screenshots
    if (m.params.resourceType === 'EventSource') return send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' }, m.sessionId);
    // Only the API is mocked; the app's own files go through, and nothing else may reach a server
    if (!/\/api\/v1\//.test(url.pathname)) {
        if (url.origin === new URL(base).origin) return send('Fetch.continueRequest', { requestId }, m.sessionId);
        return send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' }, m.sessionId);
    }
    const apiPath = url.pathname.replace(/^.*\/api\/v1/, '');
    const method = request.method;
    const cors = [
        { name: 'Access-Control-Allow-Origin', value: base },
        { name: 'Access-Control-Allow-Credentials', value: 'true' },
        { name: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' },
        { name: 'Access-Control-Allow-Headers', value: request.headers['Access-Control-Request-Headers'] || '*' },
    ];
    if (method === 'OPTIONS') return send('Fetch.fulfillRequest', { requestId, responseCode: 204, responseHeaders: cors }, m.sessionId);
    const hit = mocks.find(([pattern, , onlyMethod]) => (!onlyMethod || onlyMethod === method) && (typeof pattern === 'string' ? apiPath === pattern : pattern.test(apiPath)));
    let body = { status: true, response: [], total: 0 };
    let status = 200;
    if (hit) {
        let body2 = typeof hit[1] === 'function' ? hit[1]({ path: apiPath, query: Object.fromEntries(url.searchParams), method, body: request.postData ? safeJson(request.postData) : null }) : hit[1];
        if (body2 && body2.__status) { status = body2.__status; delete body2.__status; }
        body = body2;
    } else unmatched.add(`${method} ${apiPath}`);
    const isText = typeof body === 'string';
    send('Fetch.fulfillRequest', {
        requestId, responseCode: status,
        responseHeaders: [{ name: 'Content-Type', value: isText ? 'text/plain' : 'application/json' }, ...cors],
        body: Buffer.from(isText ? body : JSON.stringify(body)).toString('base64'),
    }, m.sessionId);
});
function safeJson(t) { try { return JSON.parse(t); } catch { return t; } }

const clickByText = (text, selector = 'button, a, [role=tab], [role=menuitem], [role=option], label, li, span, div') => `(() => {
    const want = ${JSON.stringify(text)};
    const els = [...document.querySelectorAll(${JSON.stringify(selector)})].filter((el) => el.offsetParent !== null || el.getClientRects().length);
    const el = els.find((el) => el.textContent.trim() === want) || els.find((el) => el.textContent.trim().startsWith(want)) || els.find((el) => el.textContent.includes(want));
    if (!el) return false;
    el.scrollIntoView({ block: 'center' });
    el.click();
    return true;
})()`;

async function runStep(step) {
    if (step.wait) return sleep(step.wait);
    if (step.click) { if (!(await evaluate(clickByText(step.click, step.within)))) throw new Error(`click: "${step.click}" not found`); return sleep(step.after ?? 600); }
    if (step.clickSel) {
        const ok = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(step.clickSel)}); if (!el) return false; el.scrollIntoView({ block: 'center' }); el.click(); return true; })()`);
        if (!ok) throw new Error(`clickSel: ${step.clickSel} not found`);
        return sleep(step.after ?? 600);
    }
    if (step.type) {
        // React-controlled inputs need the native setter + an input event
        const ok = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(step.type.sel)}); if (!el) return false; el.focus();
            const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
            Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(step.type.text)});
            el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); return true; })()`);
        if (!ok) throw new Error(`type: ${step.type.sel} not found`);
        return sleep(step.after ?? 300);
    }
    if (step.eval) { await evaluate(step.eval); return sleep(step.after ?? 400); }
    if (step.scroll !== undefined) { await evaluate(`(document.querySelector('main [class*="overflow-y-auto"]') || document.scrollingElement).scrollTo(0, ${step.scroll}); window.scrollTo(0, ${step.scroll})`); return sleep(step.after ?? 400); }
    if (step.scrollTo) { await evaluate(`document.querySelector(${JSON.stringify(step.scrollTo)})?.scrollIntoView({ block: ${JSON.stringify(step.block || 'start')} })`); return sleep(step.after ?? 400); }
    if (step.hover) {
        const box = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(step.hover)}); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
        if (box) await s('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y });
        return sleep(step.after ?? 400);
    }
    throw new Error(`Unknown step ${JSON.stringify(step)}`);
}

// Small fixes so screenshots look clean (no dev overlays, no blinking caret, no animations mid-way)
const CLEAN_CSS = `*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important;animation-delay:0s!important;caret-color:transparent!important}
vite-error-overlay,[data-sonner-toaster]:empty,iframe[src*="thunderbolt"]{display:none!important}`;

let failures = 0;
for (const name of specNames) {
    const spec = (await import(path.join(here, 'specs', `${name}.mjs`))).default;
    const outDir = path.join(root, 'static/img/docs', spec.module || name);
    fs.mkdirSync(outDir, { recursive: true });
    for (const shot of spec.shots) {
        if (only && shot.name !== only) continue;
        const user = { ...demoUser, ...(spec.user || {}), ...(shot.user || {}) };
        mocks = [...(shot.mocks || []), ...(spec.mocks || []), ...commonMocks(user)];
        const width = shot.width || 1440;
        const height = shot.height || 900;
        const mobile = width < 600;
        try {
            await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: shot.scale || (mobile ? 2 : 1.5), mobile });
            await s('Emulation.setTouchEmulationEnabled', { enabled: mobile });
            await s('Page.navigate', { url: `${base}/robots.txt` });
            await sleep(250);
            const theme = shot.theme || 'light';
            const signedIn = shot.signedIn !== false;
            await evaluate(`localStorage.clear(); sessionStorage.clear();
                localStorage.setItem('vite-ui-theme', '${theme}');
                ${signedIn ? `localStorage.setItem('token', 'demo-token');
                localStorage.setItem('persist:root', JSON.stringify({ auth: JSON.stringify({ user: ${JSON.stringify(user)}, token: 'demo-token', loading: {}, error: null }), _persist: JSON.stringify({ version: -1, rehydrated: true }) }));` : ''}
                ${shot.storage ? Object.entries(shot.storage).map(([k, v]) => `localStorage.setItem(${JSON.stringify(k)}, ${JSON.stringify(v)});`).join('\n') : ''}`);
            await s('Page.navigate', { url: base + shot.path });
            await sleep(shot.wait ?? 2200);
            await evaluate(`(() => { const st = document.createElement('style'); st.textContent = ${JSON.stringify(CLEAN_CSS)}; document.head.appendChild(st); })()`);
            for (const step of shot.steps || []) await runStep(step);
            await sleep(shot.settle ?? 500);
            // Sonner toasts left over from actions
            if (!shot.keepToasts) await evaluate(`document.querySelectorAll('[data-sonner-toast]').forEach((t) => t.remove())`);

            let clip;
            if (shot.clip) {
                const r = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(shot.clip)}); if (!el) return null; el.scrollIntoView({ block: 'start' }); const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; })()`);
                if (!r) throw new Error(`clip: ${shot.clip} not found`);
                const pad = shot.pad ?? 12;
                clip = { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: Math.min(width, r.width + pad * 2), height: Math.min(height, r.height + pad * 2), scale: 1 };
            } else if (shot.region) clip = { ...shot.region, scale: 1 };
            const shotRes = await s('Page.captureScreenshot', { format: 'webp', quality: shot.quality || 82, ...(clip ? { clip } : {}), captureBeyondViewport: false });
            if (shotRes.error) throw new Error(shotRes.error.message);
            fs.writeFileSync(path.join(outDir, `${shot.name}.webp`), Buffer.from(shotRes.data, 'base64'));
            console.log(`✓ ${name}/${shot.name}`);
            if (debug) console.log('  text:', (await evaluate(`document.body.innerText.slice(0, 300)`)).replace(/\s+/g, ' '), '| url:', await evaluate('location.pathname'));
        } catch (err) {
            failures++;
            console.log(`✗ ${name}/${shot.name}: ${err.message}`);
            // Keep what was on screen, to see what went wrong
            const r = await s('Page.captureScreenshot', { format: 'webp', quality: 60 });
            if (r.data) fs.writeFileSync(path.join(outDir, `${shot.name}.FAILED.webp`), Buffer.from(r.data, 'base64'));
        }
    }
}
if (unmatched.size) console.log(`\nAPI calls without a mock (answered with an empty list):\n  ${[...unmatched].sort().join('\n  ')}`);
sock.close();
cleanup();
process.exit(failures ? 1 : 0);
