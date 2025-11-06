# 📸 Add Your Screenshots Here

## Instructions

To add the images to your documentation, save your screenshots with these exact filenames in this directory:

### Image 1: Single Link - Basic Options Screenshot
**Filename:** `create-short-url-basic.png`
- Shows the "Single Link" tab
- Contains: Long URL, Title, Custom Key, Tags, and Comment fields

### Image 2: Single Link - Advanced Options Screenshot  
**Filename:** `create-short-url-advanced.png`
- Shows the "Advanced" tab
- Contains: Expiry Date, Password Protection, Target OS, Target Browser, and Target Geo fields

### Image 3: Multi Link Screenshot
**Filename:** `create-multi-short-url.png`
- Shows the "Multi Link" tab
- Contains: Multiple URLs input, Multiple Titles input, Tags, and Comment fields
- Demonstrates bulk URL shortening interface

## Steps to Add Images

1. Right-click on each screenshot image you uploaded
2. Save them to this directory: `/Users/sumitverma/Forepine/stackly-docs/static/img/url-shortener/`
3. Name them exactly as shown above
4. After saving, uncomment the image lines in `/docs/url-shortener.md`:
   - Line 8: `<!-- ![Create Short URL - Basic Options](/img/url-shortener/create-short-url-basic.png) -->`
   - Line 77: `<!-- ![Create Short URL - Advanced Options](/img/url-shortener/create-short-url-advanced.png) -->`
5. Remove the `<!--` and `-->` comment markers

## Quick Fix

Once you save the images, run these commands to uncomment the images:

```bash
cd /Users/sumitverma/Forepine/stackly-docs/docs
# Edit url-shortener.md and remove the comment markers around the image lines
```

The documentation will automatically reload and display your screenshots!
