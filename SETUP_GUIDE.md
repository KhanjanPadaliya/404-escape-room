# 🚀 Complete Setup Guide - 404 Escape Room

## Quick Start (5 Minutes)

### Step 1: Create Project Structure
```bash
mkdir 404-escape-room
cd 404-escape-room
mkdir levels
```

### Step 2: Create Files

Create these files with the provided code:

1. `index.html` - Main HTML structure
2. `style.css` - Complete styling
3. `script.js` - Frontend game logic
4. `server.js` - Backend Express server
5. `package.json` - Node dependencies

In the `levels/` directory, create:
6. `html.json`
7. `css.json`
8. `javascript.json`
9. `python.json`
10. `sql.json`
11. `networking.json`

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
====================================
404 Escape Room Server Running
====================================
Server: http://localhost:3000
Frontend: Open index.html in browser
====================================
Loaded levels:
- HTML: 20 levels
- CSS: 20 levels
- JAVASCRIPT: 20 levels
- PYTHON: 20 levels
- SQL: 20 levels
- NETWORKING: 20 levels
====================================
```

### Step 5: Open the Game
Open your browser and go to:
```
http://localhost:3000
```

Or open `index.html` directly in your browser.

---

## Detailed Installation

### Prerequisites Check

#### 1. Node.js Installation
```bash
node --version
```
Should show v14 or higher. If not installed:
- Download from: https://nodejs.org/
- Install LTS version
- Restart terminal

#### 2. npm Installation
```bash
npm --version
```
Should show v6 or higher. Comes with Node.js.

### Full Installation Steps

#### Option A: Manual Setup

1. **Create project directory**:
```bash
mkdir 404-escape-room
cd 404-escape-room
```

2. **Initialize npm** (or copy provided package.json):
```bash
npm init -y
```

3. **Install dependencies**:
```bash
npm install express cors
npm install --save-dev nodemon
```

4. **Create directory structure**:
```bash
mkdir levels
touch index.html style.css script.js server.js
cd levels
touch html.json css.json javascript.json python.json sql.json networking.json
cd ..
```

5. **Copy all provided code** into respective files

6. **Start server**:
```bash
npm start
```

#### Option B: Git Clone (If you've pushed to GitHub)

```bash
git clone https://github.com/yourusername/404-escape-room.git
cd 404-escape-room
npm install
npm start
```

---

## File Checklist

Ensure you have these files:

### Root Directory
- [ ] `index.html` (HTML structure)
- [ ] `style.css` (CSS styling)
- [ ] `script.js` (Frontend logic)
- [ ] `server.js` (Backend server)
- [ ] `package.json` (Dependencies)
- [ ] `README.md` (Documentation)

### levels/ Directory
- [ ] `html.json` (20 HTML levels)
- [ ] `css.json` (20 CSS levels)
- [ ] `javascript.json` (20 JavaScript levels)
- [ ] `python.json` (20 Python levels)
- [ ] `sql.json` (20 SQL levels)
- [ ] `networking.json` (20 Networking levels)

---

## Verification Steps

### 1. Check Server is Running
In terminal, you should see:
```
404 Escape Room Server Running
Server: http://localhost:3000
```

### 2. Test API Endpoints

**Test languages endpoint**:
```bash
curl http://localhost:3000/languages
```

Should return:
```json
{"languages":["html","css","javascript","python","sql","networking"]}
```

**Test levels endpoint**:
```bash
curl http://localhost:3000/levels/html
```

Should return array of 20 HTML levels.

### 3. Test Frontend
- Open `http://localhost:3000` in browser
- You should see the start screen with "404 ESCAPE ROOM"
- Click "INITIALIZE ESCAPE SEQUENCE"
- Should show 6 language cards

### 4. Test a Level
1. Click any language (e.g., HTML)
2. Should see level map with 20 levels
3. Click "Level 1"
4. Should load puzzle screen with:
   - Level description
   - Broken code
   - Solution input
   - Submit button

### 5. Test Solution Validation
1. In Level 1 (HTML - Broken Link)
2. Type answer: `href`
3. Click "EXECUTE FIX"
4. Should show success modal

---

## Common Issues & Solutions

### Issue 1: "Cannot find module 'express'"
**Solution**:
```bash
npm install express cors
```

### Issue 2: "Port 3000 already in use"
**Solution**:
Option A - Kill the process:
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

Option B - Use different port:
Edit `server.js`:
```javascript
const PORT = 3001; // Change to any available port
```

### Issue 3: "Cannot GET /levels/html"
**Solution**:
- Ensure `levels/` directory exists
- Check JSON files are valid (no syntax errors)
- Verify file names match exactly (case-sensitive)

### Issue 4: CORS errors in browser
**Solution**:
- Ensure server is running
- Check `cors` is installed: `npm install cors`
- Verify CORS is enabled in `server.js`

### Issue 5: Solutions not validating
**Solution**:
- Check server console for errors
- Verify POST endpoint is working:
```bash
curl -X POST http://localhost:3000/validate-solution \
  -H "Content-Type: application/json" \
  -d '{"language":"html","level":0,"solution":"href"}'
```

### Issue 6: Frontend not loading
**Solution**:
- Check browser console for errors (F12)
- Ensure server is running on correct port
- Try accessing directly: `http://localhost:3000/index.html`

---

## Development Mode

For development with auto-restart on file changes:

### Install nodemon
```bash
npm install --save-dev nodemon
```

### Add script to package.json
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Run in dev mode
```bash
npm run dev
```

Now server auto-restarts when you edit `server.js` or level files.

---

## Testing the Game

### Manual Testing Checklist

#### Start Screen
- [ ] Glitch animation works
- [ ] Start button visible
- [ ] Clicking button goes to language screen

#### Language Selection
- [ ] All 6 language cards visible
- [ ] Hover effects work
- [ ] Clicking card loads level map

#### Level Map
- [ ] Shows 20 levels
- [ ] Level 1 is unlocked
- [ ] Other levels are locked
- [ ] Progress/score displays correctly

#### Puzzle Screen
- [ ] Level info displays
- [ ] Code is formatted
- [ ] Solution input works
- [ ] Submit button functional
- [ ] Hint button works

#### Solution Validation
- [ ] Correct answer advances level
- [ ] Wrong answer shows error
- [ ] Success modal appears
- [ ] Score calculated correctly

#### Progress Saving
- [ ] Complete a level
- [ ] Refresh page
- [ ] Progress persists
- [ ] Completed levels show checkmark

---

## Browser Compatibility

### Recommended Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### Required Features
- ES6+ JavaScript
- CSS Grid
- CSS Flexbox
- LocalStorage API
- Fetch API

### Testing on Different Browsers
1. Open game in each browser
2. Test all core features
3. Check console for errors
4. Verify animations work

---

## Production Deployment

### Option 1: Static Hosting (Frontend Only)
If you modify frontend to work without backend:

1. **Netlify**:
```bash
netlify deploy --prod
```

2. **Vercel**:
```bash
vercel --prod
```

3. **GitHub Pages**:
```bash
git push origin main
# Enable GitHub Pages in repo settings
```

### Option 2: Full Stack Hosting

1. **Heroku**:
```bash
heroku create 404-escape-room
git push heroku main
```

2. **Railway**:
- Connect GitHub repo
- Auto-deploys on push

3. **DigitalOcean App Platform**:
- Connect repo
- Configure build settings

### Environment Variables
For production, set:
```bash
PORT=3000
NODE_ENV=production
```

---

## Performance Optimization

### 1. Minify Assets
```bash
npm install -g uglify-js clean-css-cli
uglifyjs script.js -o script.min.js
cleancss style.css -o style.min.css
```

### 2. Enable Compression (server.js)
```javascript
const compression = require('compression');
app.use(compression());
```

### 3. Cache Static Assets
```javascript
app.use(express.static('.', {
  maxAge: '1d',
  etag: true
}));
```

### 4. Lazy Load Levels
Currently all 20 levels load at once. Consider loading on-demand:
```javascript
async function loadLevel(index) {
  const level = await fetch(`/api/level/${lang}/${index}`);
  // ...
}
```

---

## Security Considerations

### 1. Input Validation
Server validates all inputs. Ensure:
- No code execution
- No file system access
- Pattern matching only

### 2. Rate Limiting
Add rate limiting to prevent API abuse:
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/validate-solution', limiter);
```

### 3. HTTPS
In production, always use HTTPS:
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443);
```

---

## Monitoring & Analytics

### Add Logging
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Track Events
Add to `script.js`:
```javascript
function trackEvent(action, label) {
  // Google Analytics
  gtag('event', action, {
    'event_category': 'Game',
    'event_label': label
  });
}
```

---

## Backup & Recovery

### Backup Progress Data
LocalStorage can be exported:
```javascript
function exportProgress() {
  const data = localStorage.getItem('escapeRoomProgress');
  const blob = new Blob([data], {type: 'application/json'});
  // Download blob
}
```

### Backup Level Files
```bash
tar -czf levels-backup.tar.gz levels/
```

---

## Support

If you encounter issues:

1. **Check logs**: Server console shows detailed errors
2. **Browser console**: Press F12 to see frontend errors
3. **Verify files**: Ensure all files are in correct locations
4. **Test API**: Use curl or Postman to test endpoints
5. **Contact**: padaliyakhanjan@gmail.com

---

## Next Steps

After successful setup:

1. ✅ Test all 6 languages
2. ✅ Complete at least one full path
3. ✅ Customize levels for your needs
4. ✅ Deploy to production
5. ✅ Share with students/community
6. ✅ Contribute back improvements

---

**Happy Debugging! 🐛➡️✅**