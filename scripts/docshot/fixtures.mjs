/**
 * The demo workspace every screenshot shows: "Aarav Mehta" at "Brightleaf Digital", a small
 * marketing agency on the Growth plan. Specs add mocks for their own pages on top of these.
 */
const day = 864e5;
export const iso = (offsetDays = 0, hour = 10) => { const d = new Date(Date.now() + offsetDays * day); d.setHours(hour, 0, 0, 0); return d.toISOString(); };

export const demoUser = {
    name: 'Aarav Mehta',
    email: 'aarav@brightleaf.in',
    role: 'Owner',
    userId: 101,
    accountId: 101,
    isVerified: 1,
    authentication: 'Email',
    isInternal: 0,
    oAuth: 0,
    avatar: null,
    status: 1,
    createdAt: iso(-120),
    updatedAt: iso(-1),
    usersLimit: 5, usersUsed: 3,
    shortUrlLimit: 2000, shortUrlUsed: 486,
    screenshotsLimit: 200, screenshotsUsed: 12,
    webSearchLimit: 200, webSearchUsed: 0,
    pdfLimit: 200, pdfUsed: 9,
    htmlScraperLimit: 200, htmlScraperUsed: 0,
    bioPageLimit: 25, bioPageUsed: 4,
    seoScraperLimit: 200, seoScraperUsed: 0,
    sNotesLimit: 200, sNotesUsed: 18,
    cDomainLimit: 3, cDomainUsed: 1,
    eventsLimit: 50, eventsUsed: 6,
    retentionDays: 365,
    trialEndsAt: iso(-113),
    companyName: 'Brightleaf Digital',
    referralCode: 'stly101',
    phone: '+91 98200 12345',
    billingName: 'Brightleaf Digital LLP',
    taxName: 'GSTIN',
    taxNumber: '27ABCDE1234F1Z5',
    address: { street: '4th Floor, Kamala Mills', city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    accountStatus: 1,
    discordConnected: 0,
    slackConnected: 1,
    planId: 3,
    plan: 'Growth',
    subscriptionId: 55,
    subscriptionStartDate: iso(-40),
    subscriptionEndDate: iso(325),
    subscriptionStatus: 'active',
};

export const ok = (response, extra = {}) => ({ status: true, response, ...extra });
export const table = (rows, total = rows.length, extra = {}) => ({ status: true, total, count: rows.length, response: rows, ...extra });

/** Calls every signed-in page makes (header, sidebar, plan checks) */
export const commonMocks = (user) => [
    ['/auth/me', ok(user)],
];
