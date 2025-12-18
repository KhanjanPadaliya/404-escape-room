const API_BASE = "https://four04-escape-room.onrender.com";


// ==========================================
// GAME STATE MANAGEMENT
// ==========================================
const gameState = {
    currentLanguage: null,
    currentLevel: 0,
    score: 0,
    hintsUsed: 0,
    completedLevels: {},
    levelScores: {}
};

// Load saved progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('escapeRoomProgress');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.completedLevels = data.completedLevels || {};
        gameState.levelScores = data.levelScores || {};
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('escapeRoomProgress', JSON.stringify({
        completedLevels: gameState.completedLevels,
        levelScores: gameState.levelScores
    }));
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenId) {
    console.log('Switching to screen:', screenId);
    
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log('Screen switched successfully to:', screenId);
        
        // Smooth scroll to the new screen
        targetScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error('Screen not found:', screenId);
    }
}

// ==========================================
// START SCREEN
// ==========================================
function initializeStartScreen() {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log('Start button clicked!');
            loadProgress();
            console.log('Progress loaded');
            showScreen('language-screen');
            console.log('Should now show language screen');
        });
        console.log('Start button initialized');
    } else {
        console.error('Start button not found!');
    }
}

// ==========================================
// LANGUAGE SELECTION
// ==========================================
// Language cards are initialized in initializeLanguageSelection()

async function loadLevelMap(language) {
    try {
        // Try to fetch from server
        const response = await fetch(`${API_BASE}/levels/${language}`)

        
        if (!response.ok) {
            throw new Error('Server not responding');
        }
        
        const levels = await response.json();
        gameState.levels = levels;
        renderLevelMap();
        showScreen('map-screen');
    } catch (error) {
        // Fallback: Show error message
        console.error('Error loading levels:', error);
        addLog(`ERROR: Could not load ${language} levels. Is the server running?`, 'error');
        
        // Show helpful message
        alert(`Cannot load levels. Please ensure:\n\n1. Server is running (npm start)\n2. Server is on http://localhost:3000\n3. levels/${language}.json file exists\n\nCheck console for details.`);
    }
}

function renderLevelMap() {
    const mapTitle = document.getElementById('map-title');
    const levelGrid = document.getElementById('level-grid');
    const progressCount = document.getElementById('progress-count');
    const scoreCount = document.getElementById('score-count');
    
    mapTitle.textContent = `${gameState.currentLanguage.toUpperCase()} ESCAPE MAP`;
    levelGrid.innerHTML = '';
    
    const langKey = gameState.currentLanguage;
    const completed = gameState.completedLevels[langKey] || [];
    const totalScore = gameState.levelScores[langKey] || 0;
    
    progressCount.textContent = completed.length;
    scoreCount.textContent = totalScore;
    
    gameState.levels.forEach((level, index) => {
        const levelCard = document.createElement('div');
        levelCard.className = 'level-card';
        
        const isCompleted = completed.includes(index);
        const isLocked = index > 0 && !completed.includes(index - 1);
        
        if (isCompleted) levelCard.classList.add('completed');
        if (isLocked) levelCard.classList.add('locked');
        
        levelCard.innerHTML = `
            <span class="level-number">${index + 1}</span>
            <span class="level-name">${level.name}</span>
            ${isCompleted ? `<span class="level-score">✓ ${level.maxScore || 100}</span>` : ''}
        `;
        
        if (!isLocked) {
            levelCard.addEventListener('click', () => loadLevel(index));
        }
        
        levelGrid.appendChild(levelCard);
    });
}

// Map back button initialized in initializeButtons()
// ==========================================
// HINT SYSTEM
// ==========================================
function showHint() {
    const level = gameState.levels[gameState.currentLevel];
    const hintPanel = document.getElementById('hint-panel');
    const hintContent = document.getElementById('hint-content');
    
    if (!hintPanel.classList.contains('active')) {
        hintPanel.classList.add('active');
        
        if (gameState.hintsUsed === 0) {
            hintContent.textContent = level.hints[0];
        } else if (gameState.hintsUsed === 1 && level.hints[1]) {
            hintContent.textContent = level.hints[1];
        } else {
            hintContent.textContent = 'No more hints available for this level.';
        }
        
        gameState.hintsUsed++;
        addLog('Hint accessed. Score penalty applied.', 'info');
    } else {
        hintPanel.classList.remove('active');
    }
}
function loadLevel(levelIndex) {
    gameState.currentLevel = levelIndex;
    gameState.hintsUsed = 0;
    const level = gameState.levels[levelIndex];
    
    document.getElementById('level-number').textContent = `Level ${levelIndex + 1}`;
    document.getElementById('level-title').textContent = level.name;
    document.getElementById('puzzle-desc').innerHTML = level.description;
    document.getElementById('code-lang-label').textContent = gameState.currentLanguage.toUpperCase();
    document.getElementById('code-display').textContent = level.code;
    document.getElementById('solution-input').value = '';
    document.getElementById('hint-panel').classList.remove('active');
    document.getElementById('terminal-log').innerHTML = '';
    
    addLog('System initialized. Analyze the code carefully.', 'info');
    addLog('Type your solution and execute when ready.', 'info');
    
    showScreen('puzzle-screen');
}

// ==========================================
// PUZZLE SCREEN
// ==========================================

// Exit level button initialized in initializeButtons()

// ==========================================
// SOLUTION VALIDATION
// ==========================================
async function submitSolution() {
    const solution = document.getElementById('solution-input').value.trim();
    
    if (!solution) {
        addLog('ERROR: Solution cannot be empty', 'error');
        return;
    }
    
    addLog('Executing fix...', 'info');
    
    try {
        const response = await fetch(`${API_BASE}/validate-solution`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: gameState.currentLanguage,
                level: gameState.currentLevel,
                solution: solution
            })
        });
        
        const result = await response.json();
        
        if (result.correct) {
            handleSuccess(result);
        } else {
            addLog(`ERROR: ${result.message}`, 'error');
        }
    } catch (error) {
        addLog('ERROR: Connection failed', 'error');
        console.error(error);
    }
}

function handleSuccess(result) {
    addLog('SUCCESS: Fix validated!', 'success');
    addLog('Level complete. Calculating score...', 'info');
    
    // Calculate score with hint penalty
    const baseScore = gameState.levels[gameState.currentLevel].maxScore || 100;
    const hintPenalty = gameState.hintsUsed * 20;
    const finalScore = Math.max(baseScore - hintPenalty, 10);
    
    // Save progress
    const langKey = gameState.currentLanguage;
    if (!gameState.completedLevels[langKey]) {
        gameState.completedLevels[langKey] = [];
    }
    if (!gameState.completedLevels[langKey].includes(gameState.currentLevel)) {
        gameState.completedLevels[langKey].push(gameState.currentLevel);
    }
    
    if (!gameState.levelScores[langKey]) {
        gameState.levelScores[langKey] = 0;
    }
    gameState.levelScores[langKey] += finalScore;
    
    saveProgress();
    
    // Show success modal
    showSuccessModal(finalScore);
}

function showSuccessModal(score) {
    const modal = document.getElementById('success-modal');
    const statsDiv = document.getElementById('level-stats');
    
    statsDiv.innerHTML = `
        <p>Score: <strong>${score}</strong> points</p>
        <p>Hints Used: <strong>${gameState.hintsUsed}</strong></p>
        <p>Status: <strong>DEBUGGED</strong></p>
    `;
    
    modal.classList.add('active');
}

// Modal buttons initialized in initializeButtons()

// ==========================================
// ESCAPE SUCCESS SCREEN
// ==========================================
function showEscapeScreen() {
    const langKey = gameState.currentLanguage;
    const completed = gameState.completedLevels[langKey] || [];
    const totalScore = gameState.levelScores[langKey] || 0;
    
    document.getElementById('final-lang').textContent = langKey.toUpperCase();
    document.getElementById('final-score').textContent = totalScore;
    document.getElementById('final-levels').textContent = completed.length;
    document.getElementById('final-hints').textContent = calculateTotalHints(langKey);
    
    showScreen('escape-screen');
}

function calculateTotalHints(language) {
    // This is a simplified version - in production, you'd track this properly
    return Math.floor(Math.random() * 20);
}

// Escape screen buttons initialized in initializeButtons()

// ==========================================
// TERMINAL LOG
// ==========================================
function addLog(message, type = 'info') {
    const terminal = document.getElementById('terminal-log');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    terminal.appendChild(logEntry);
    terminal.scrollTop = terminal.scrollHeight;
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('404 Escape Room initialized');
    console.log('Backend server should be running on http://localhost:3000');
    
    // Initialize all event listeners
    initializeStartScreen();
    initializeLanguageSelection();
    initializeButtons();
    
    console.log('All event listeners initialized');
});

// Initialize language selection
function initializeLanguageSelection() {
    document.querySelectorAll('.language-card').forEach(card => {
        card.addEventListener('click', () => {
            const lang = card.dataset.lang;
            console.log('Language selected:', lang);
            gameState.currentLanguage = lang;
            loadLevelMap(lang);
        });
    });
}

// Initialize other buttons
function initializeButtons() {
    // Back to language button
    const backToLangBtn = document.getElementById('back-to-lang');
    if (backToLangBtn) {
        backToLangBtn.addEventListener('click', () => {
            showScreen('language-screen');
        });
    }
    
    // Exit level button
    const exitLevelBtn = document.getElementById('exit-level');
    if (exitLevelBtn) {
        exitLevelBtn.addEventListener('click', () => {
            renderLevelMap();
            showScreen('map-screen');
        });
    }
    
    // Hint button
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.addEventListener('click', showHint);
    }
    
    // Submit solution button
    const submitBtn = document.getElementById('submit-solution');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitSolution);
    }
    
    // Modal buttons
    const nextLevelBtn = document.getElementById('next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.addEventListener('click', () => {
            document.getElementById('success-modal').classList.remove('active');
            
            if (gameState.currentLevel < gameState.levels.length - 1) {
                loadLevel(gameState.currentLevel + 1);
            } else {
                showEscapeScreen();
            }
        });
    }
    
    const backToMapBtn = document.getElementById('back-to-map');
    if (backToMapBtn) {
        backToMapBtn.addEventListener('click', () => {
            document.getElementById('success-modal').classList.remove('active');
            renderLevelMap();
            showScreen('map-screen');
        });
    }
    
    // Escape screen buttons
    const tryAnotherBtn = document.getElementById('try-another');
    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', () => {
            showScreen('language-screen');
        });
    }
    
    const restartBtn = document.getElementById('restart-game');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            if (confirm('Are you sure? This will reset all progress.')) {
                localStorage.removeItem('escapeRoomProgress');
                location.reload();
            }
        });
    }
}