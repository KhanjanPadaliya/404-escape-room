# 404 ESCAPE ROOM — Multi-Language Edition 🚀

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Languages](https://img.shields.io/badge/Languages-6-blue)
![Levels](https://img.shields.io/badge/Total%20Levels-120-orange)
![License](https://img.shields.io/badge/License-MIT-green)

> **Debug your way out of a broken website universe.**  
> A professional-grade educational puzzle game teaching real programming concepts through interactive debugging challenges.

---

## 🎯 Project Overview

**404 Escape Room** is a browser-based educational game where players debug their way through 120 levels across 6 programming languages. Each level presents a real coding bug that must be fixed to progress. This is **not** a multiple-choice quiz—it's a hands-on debugging simulator.

### 🌟 Key Features

- **6 Complete Language Paths**: HTML, CSS, JavaScript, Python, SQL, HTTP/Networking
- **120 Real Debugging Puzzles**: 20 levels per language
- **Progressive Difficulty**: From beginner to advanced concepts
- **Hint System**: Cryptic hints that reduce final score
- **Progress Tracking**: LocalStorage saves your progress
- **Professional UI**: Terminal-style, glitch effects, broken website aesthetic
- **Educational Focus**: Learn by fixing, not guessing

---

## 📚 Language Paths

### 1. HTML Escape Room (★★☆☆☆)
**Concept**: Structural chaos & semantic errors

**Learn**: Broken tags, nesting errors, accessibility issues, semantic HTML, form validation, DOCTYPE, meta tags, ARIA attributes

**Example Levels**:
- Fix broken anchor tag (href typo)
- Unclosed paragraph tags
- Hidden clues in comments
- Incorrect tag nesting
- Missing ARIA labels

---

### 2. CSS Escape Room (★★★☆☆)
**Concept**: Visual deception & layout traps

**Learn**: Display properties, z-index, overflow, flexbox, grid, pseudo-classes, animations, specificity, responsive design

**Example Levels**:
- Hidden elements (display:none)
- Z-index stacking issues
- Flexbox centering bugs
- Media query syntax errors
- CSS variable usage

---

### 3. JavaScript Escape Room (★★★★☆)
**Concept**: Logic warfare & async chaos

**Learn**: Scope, closures, event handling, promises, async/await, DOM manipulation, type coercion, this context, array methods

**Example Levels**:
- Function name typos
- Scope bugs (var vs let)
- Event bubbling issues
- Promise never resolving
- Closure traps in loops

---

### 4. Python Escape Room (★★★☆☆)
**Concept**: Backend mysteries

**Learn**: Indentation, scope, mutability, functions, exceptions, list comprehensions, file handling, decorators, generators

**Example Levels**:
- Indentation errors
- List vs tuple mutability
- Dictionary KeyError
- Mutable default arguments
- String formatting

---

### 5. SQL Escape Room (★★★★☆)
**Concept**: Data logic traps

**Learn**: SELECT, WHERE, JOIN, GROUP BY, aggregations, subqueries, NULL handling, indexes, transactions, window functions

**Example Levels**:
- Wrong column names
- Missing WHERE clauses
- JOIN without ON
- IS NULL vs = NULL
- UNION vs UNION ALL

---

### 6. HTTP/Networking Escape Room (★★★★★)
**Concept**: Protocol chaos

**Learn**: Status codes, HTTP methods, headers, CORS, caching, authentication, REST principles, WebSocket, rate limiting

**Example Levels**:
- 404 vs 500 confusion
- Wrong HTTP method (GET vs POST)
- Missing Content-Type
- CORS errors
- Rate limiting (429)

---

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Custom animations, grid, flexbox
- **Vanilla JavaScript**: No frameworks, pure ES6+

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web server framework
- **CORS**: Cross-origin support

### Data
- **JSON Files**: Level data stored in `/levels/` directory
- **LocalStorage**: Client-side progress persistence

---

## 📁 Project Structure

```
404-escape-room/
│
├── index.html              # Main HTML structure
├── style.css               # Complete styling with animations
├── script.js               # Frontend game logic
├── server.js               # Express backend server
├── package.json            # Node dependencies
├── README.md               # This file
│
└── levels/                 # Level data (JSON)
    ├── html.json           # 20 HTML debugging levels
    ├── css.json            # 20 CSS debugging levels
    ├── javascript.json     # 20 JavaScript debugging levels
    ├── python.json         # 20 Python debugging levels
    ├── sql.json            # 20 SQL debugging levels
    └── networking.json     # 20 HTTP/Networking levels
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, Edge)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/404-escape-room.git
cd 404-escape-room
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Server
```bash
npm start
```

Server will run on `http://localhost:3000`

### Step 4: Open Game
Open your browser and navigate to:
```
http://localhost:3000
```

Or directly open `index.html` in your browser (requires server running for API calls)

---

## 🎮 How to Play

### 1. **Choose Your Path**
Select one of 6 programming languages to begin your escape journey.

### 2. **Read the Challenge**
Each level presents:
- A description of the bug
- Broken code
- Your objective

### 3. **Analyze the Code**
Look for:
- Syntax errors
- Logic bugs
- Missing elements
- Incorrect values

### 4. **Submit Your Fix**
Type your solution in the input field and execute.

### 5. **Use Hints (Optional)**
Stuck? Click the hint button, but beware: hints reduce your score!

### 6. **Progress Through Levels**
Complete all 20 levels to escape that language universe.

### 7. **Try Another Language**
Master all 6 languages for complete debugging mastery!

---

## 🧠 Game Mechanics

### Scoring System
- **Base Score**: Each level has a maximum score (100-200 points)
- **Hint Penalty**: -20 points per hint used
- **Minimum Score**: Always get at least 10 points for completion

### Progression
- Levels unlock sequentially
- Must complete Level N to unlock Level N+1
- Progress saved automatically in browser

### Hints
- 2 hints per level (some levels have only 1)
- First hint is cryptic
- Second hint is more direct
- Each hint reduces final score

---

## 🏗️ API Endpoints

### `GET /languages`
Returns list of available languages.

**Response**:
```json
{
  "languages": ["html", "css", "javascript", "python", "sql", "networking"]
}
```

### `GET /levels/:language`
Returns all 20 levels for specified language.

**Parameters**:
- `language`: One of the 6 supported languages

**Response**: Array of level objects

### `POST /validate-solution`
Validates player's solution.

**Request Body**:
```json
{
  "language": "javascript",
  "level": 5,
  "solution": "player's answer"
}
```

**Response**:
```json
{
  "correct": true,
  "message": "Solution validated successfully!",
  "score": 120
}
```

---

## 🔧 Customization

### Adding New Levels

1. **Edit JSON File**:
```json
{
  "id": 21,
  "name": "Your Level Name",
  "description": "<p>Description in HTML</p>",
  "code": "broken code here",
  "acceptedAnswers": ["answer1", "answer2"],
  "hints": ["hint 1", "hint 2"],
  "maxScore": 100
}
```

2. **Add to Appropriate File**:
Add to `/levels/{language}.json`

3. **Restart Server**:
```bash
npm start
```

### Adding New Languages

1. Create `/levels/newlanguage.json`
2. Add language card in `index.html`
3. Update server.js language list
4. Add validation logic in server.js

---

## 📖 Educational Value

### For Students
- **Learn by Doing**: Fix real bugs, not theoretical problems
- **Immediate Feedback**: Know instantly if solution is correct
- **Conceptual Understanding**: Each level teaches a specific concept
- **Progressive Learning**: Difficulty increases naturally

### For Educators
- **Structured Curriculum**: 120 organized lessons
- **Assessment Tool**: Track student progress and scores
- **Engagement**: Game mechanics increase motivation
- **Extensible**: Easy to add custom levels for your curriculum

### For Self-Learners
- **Self-Paced**: Learn at your own speed
- **Multiple Paths**: Focus on languages you need
- **Challenge Yourself**: Advanced levels test deep understanding
- **Portfolio Project**: Showcase completion to employers

---

## 🎨 Design Philosophy

### UI/UX Principles
- **Terminal Aesthetic**: Monospace fonts, green text, command-line feel
- **Broken Website Theme**: Glitch effects, error messages, 404 motifs
- **Minimalist**: No distractions, focus on the puzzle
- **Accessible**: Clear contrast, readable text, semantic HTML

### Educational Design
- **No Guessing**: Solutions require understanding, not luck
- **Real-World Relevance**: Every bug is based on actual developer mistakes
- **Conceptual Depth**: Levels build on previous knowledge
- **Authentic Practice**: Code examples mirror real debugging scenarios

---

## 🐛 Known Issues & Limitations

### Current Limitations
- **Client-Side Validation**: Solutions validated via pattern matching
- **No Code Execution**: Python/JavaScript code isn't actually run
- **LocalStorage Only**: Progress lost if browser data cleared
- **Single Player**: No multiplayer or leaderboards

### Future Enhancements
- Server-side code execution sandbox
- Database for persistent progress
- Leaderboards and achievements
- Social features (share progress)
- More languages (Ruby, Java, Go, Rust)
- Difficulty modes (Easy, Normal, Hard)
- Time trials and challenges

---

## 🤝 Contributing

Contributions welcome! Here's how:

### Bug Reports
1. Check existing issues
2. Create detailed bug report with steps to reproduce
3. Include browser/OS information

### New Levels
1. Fork the repository
2. Add levels to appropriate JSON file
3. Test thoroughly
4. Submit pull request with description

### Code Improvements
1. Follow existing code style
2. Add comments for complex logic
3. Test on multiple browsers
4. Update documentation

---

## 📊 Level Statistics

| Language   | Levels | Difficulty | Focus Area |
|------------|--------|------------|------------|
| HTML       | 20     | ★★☆☆☆     | Structure  |
| CSS        | 20     | ★★★☆☆     | Styling    |
| JavaScript | 20     | ★★★★☆     | Logic      |
| Python     | 20     | ★★★☆☆     | Backend    |
| SQL        | 20     | ★★★★☆     | Data       |
| Networking | 20     | ★★★★★     | Protocols  |

**Total**: 120 levels covering essential web development concepts

---

## 📜 License

This project is licensed under the **MIT License**.

You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Include in your portfolio

See [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

**Khanjan Padaliya**

- 📧 Email: [padaliyakhanjan@gmail.com](mailto:padaliyakhanjan@gmail.com)
- 💼 GitHub: [@yourusername](https://github.com/yourusername)
- 🔗 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- 🌐 Portfolio: [Your Website](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- Inspired by real debugging experiences
- Educational resources from MDN, W3Schools, Stack Overflow
- Beta testers and early feedback providers
- Open source community

---

## 📞 Support

### Getting Help
- **Documentation**: Read this README thoroughly
- **Issues**: Check [GitHub Issues](https://github.com/yourusername/404-escape-room/issues)
- **Email**: Contact padaliyakhanjan@gmail.com
- **Community**: Join discussions in Issues section

### Frequently Asked Questions

**Q: Can I add my own levels?**  
A: Yes! Edit the JSON files in `/levels/` directory.

**Q: Does it work offline?**  
A: Frontend works offline, but backend server must be running for validation.

**Q: Can I use this in my classroom?**  
A: Absolutely! It's designed for educational use.

**Q: How are solutions validated?**  
A: Server uses pattern matching and keyword detection. See `server.js` for logic.

**Q: Will you add more languages?**  
A: Possibly! Open an issue to request specific languages.

---

## 🌟 Star This Repository

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with 💚 by Khanjan Padaliya**

*Debug. Learn. Escape.*

[⬆ Back to Top](#404-escape-room--multi-language-edition-)

</div>#   4 0 4 - e s c a p e - r o o m  
 