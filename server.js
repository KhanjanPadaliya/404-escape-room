const API_BASE = "https://four04-escape-room.onrender.com";


const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Load level data
function loadLevels(language) {
    try {
        const filePath = path.join(__dirname, 'levels', `${language}.json`);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${language} levels:`, error);
        return [];
    }
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Get available languages
app.get('/languages', (req, res) => {
    res.json({
        languages: ['html', 'css', 'javascript', 'python', 'sql', 'networking']
    });
});

// Get levels for a specific language
app.get('/levels/:language', (req, res) => {
    const { language } = req.params;
    const levels = loadLevels(language);
    
    if (levels.length === 0) {
        return res.status(404).json({ error: 'Language not found' });
    }
    
    res.json(levels);
});

// Validate solution
app.post('/validate-solution', (req, res) => {
    const { language, level, solution } = req.body;
    
    const levels = loadLevels(language);
    const currentLevel = levels[level];
    
    if (!currentLevel) {
        return res.status(404).json({ error: 'Level not found' });
    }
    
    // Validation logic based on language
    const isCorrect = validateSolution(language, currentLevel, solution);
    
    if (isCorrect) {
        res.json({
            correct: true,
            message: 'Solution validated successfully!',
            score: currentLevel.maxScore || 100
        });
    } else {
        res.json({
            correct: false,
            message: currentLevel.errorMessage || 'Solution is incorrect. Analyze the code again.'
        });
    }
});

// ==========================================
// VALIDATION LOGIC
// ==========================================

function validateSolution(language, level, solution) {
    const cleanSolution = solution.trim().toLowerCase();
    
    // Check multiple accepted answers
    if (level.acceptedAnswers) {
        return level.acceptedAnswers.some(answer => 
            cleanSolution.includes(answer.toLowerCase())
        );
    }
    
    // Check exact answer
    if (level.answer) {
        return cleanSolution.includes(level.answer.toLowerCase());
    }
    
    // Check pattern match
    if (level.pattern) {
        const regex = new RegExp(level.pattern, 'i');
        return regex.test(solution);
    }
    
    // Custom validation functions
    switch(language) {
        case 'html':
            return validateHTML(level, solution);
        case 'css':
            return validateCSS(level, solution);
        case 'javascript':
            return validateJavaScript(level, solution);
        case 'python':
            return validatePython(level, solution);
        case 'sql':
            return validateSQL(level, solution);
        case 'networking':
            return validateNetworking(level, solution);
        default:
            return false;
    }
}

function validateHTML(level, solution) {
    const clean = solution.trim().toLowerCase();
    
    // Check for required tags
    if (level.requiredTags) {
        return level.requiredTags.every(tag => clean.includes(tag));
    }
    
    // Check for specific fixes
    if (level.mustInclude) {
        return level.mustInclude.every(item => clean.includes(item.toLowerCase()));
    }
    
    return false;
}

function validateCSS(level, solution) {
    const clean = solution.trim().toLowerCase();
    
    // Check for CSS properties
    if (level.requiredProperties) {
        return level.requiredProperties.every(prop => clean.includes(prop));
    }
    
    return false;
}

function validateJavaScript(level, solution) {
    const clean = solution.trim().toLowerCase();
    
    // Check for keywords
    if (level.mustContain) {
        return level.mustContain.every(keyword => clean.includes(keyword));
    }
    
    return false;
}

function validatePython(level, solution) {
    const clean = solution.trim();
    
    // Check indentation (simple check)
    if (level.checkIndentation) {
        const lines = solution.split('\n');
        const hasProperIndent = lines.some(line => line.startsWith('    ') || line.startsWith('\t'));
        if (!hasProperIndent && level.requiresIndent) return false;
    }
    
    // Check for keywords
    if (level.mustContain) {
        return level.mustContain.every(keyword => clean.includes(keyword));
    }
    
    return false;
}

function validateSQL(level, solution) {
    const clean = solution.trim().toUpperCase();
    
    // Check for SQL keywords
    if (level.requiredKeywords) {
        return level.requiredKeywords.every(keyword => clean.includes(keyword.toUpperCase()));
    }
    
    return false;
}

function validateNetworking(level, solution) {
    const clean = solution.trim();
    
    // Check for status codes, methods, etc.
    if (level.mustMatch) {
        return level.mustMatch.some(match => clean.includes(match));
    }
    
    return false;
}

// ==========================================
// SERVER START
// ==========================================

app.listen(PORT, () => {
    console.log(`====================================`);
    console.log(`404 Escape Room Server Running`);
    console.log(`====================================`);
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Frontend: Open index.html in browser`);
    console.log(`====================================`);
    console.log(`Loaded levels:`);
    
    ['html', 'css', 'javascript', 'python', 'sql', 'networking'].forEach(lang => {
        const levels = loadLevels(lang);
        console.log(`- ${lang.toUpperCase()}: ${levels.length} levels`);
    });
    
    console.log(`====================================`);
});