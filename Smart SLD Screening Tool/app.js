// Global variables
if (typeof currentStep === 'undefined') {
    var currentStep = 'welcome';
}

if (typeof userProfile === 'undefined') {
    var userProfile = {
    name: '',
    age: '',
    gender: '',
    grade: '',
    photo: '',
        date: new Date().toLocaleDateString()
    };
}

if (typeof questions === 'undefined') {
    var questions = [];
}

if (typeof currentQuestionIndex === 'undefined') {
    var currentQuestionIndex = 0;
}

if (typeof answers === 'undefined') {
    var answers = {};
}

if (typeof vantaEffect === 'undefined') {
    var vantaEffect = null;
}

// Initialize Vanta.js background
function initVanta() {
    try {
        if (window.VANTA && !vantaEffect) {
            console.log('Initializing Vanta.js...');
            vantaEffect = window.VANTA.NET({
                el: '#vanta-bg',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x7c3aed,
                backgroundColor: 0x0,
                points: 10.00,
                maxDistance: 25.00,
                spacing: 18.00
            });
            console.log('Vanta.js initialized successfully');
        } else if (!window.VANTA) {
            console.error('VANTA is not defined. Make sure three.js and vanta.net.min.js are loaded.');
        }
    } catch (error) {
        console.error('Error initializing Vanta.js:', error);
    }
}

// Clean up Vanta.js
document.addEventListener('beforeunload', () => {
    if (vantaEffect) {
        vantaEffect.destroy();
    }
});

// All questions and logic from sld_screening.py
if (typeof QUESTIONS_DATA === 'undefined') {
    var QUESTIONS_DATA = {
    "Dyslexia": {
        "desc": "Reading fluency, letter/sound mapping, decoding",
        "questions": [
            {
                id: 'D1',
                text: 'Does the child reverse letters (b/d, p/q) when reading or writing?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'D2',
                text: 'Does the child frequently skip words or lines while reading?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'D3',
                text: 'Does the child read slowly and with many mistakes compared to peers?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'D4',
                text: 'Does the child avoid reading aloud or say they "don\'t like reading"?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            }
        ],
        "thresholds": {"low": 0, "moderate": 4, "high": 7}
    },
    "Dysgraphia": {
        "desc": "Handwriting, written organization, orthographic memory",
        "questions": [
            {
                id: 'G1',
                text: 'Is the child\'s handwriting often illegible or inconsistent?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'G2',
                text: 'Does the child have trouble organizing written work (sentences/paragraphs)?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'G3',
                text: 'Does the child take much longer than classmates to finish written tasks?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'G4',
                text: 'Does the child make lots of spelling and punctuation mistakes in the same paragraph?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            }
        ],
        "thresholds": {"low": 0, "moderate": 4, "high": 7}
    },
    "Dyscalculia": {
        "desc": "Number sense, arithmetic facts, numerical operations",
        "questions": [
            {
                id: 'C1',
                text: 'Does the child have trouble understanding number relationships (more/less)?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'C2',
                text: 'Does the child forget basic math facts after practicing?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'C3',
                text: 'Does the child reverse numbers or digits (e.g., 14 vs 41)?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            },
            {
                id: 'C4',
                text: 'Does the child struggle with word-problems and steps in arithmetic?',
                options: [
                    { value: 0, text: 'Never' },
                    { value: 1, text: 'Sometimes' },
                    { value: 2, text: 'Often' },
                    { value: 3, text: 'Always' }
                ]
            }
        ],
        "thresholds": {"low": 0, "moderate": 4, "high": 7}
    }
};
}

// Show loading overlay with message
function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const messageEl = document.getElementById('loading-message');
    
    if (overlay && messageEl) {
        messageEl.textContent = message;
        overlay.classList.remove('hidden');
    }
}


// Initialize the application
function init() {
    console.log('Initializing application...');
    
    try {
        // Set up event listeners first
        console.log('Setting up event listeners...');
        setupEventListeners();
        
        // Initialize charts
        console.log('Initializing charts...');
        window.resultsChart = null;
        window.severityChart = null;
        
        // Check if required elements exist
        const welcomeScreen = document.getElementById('welcome-screen');
        if (!welcomeScreen) {
            throw new Error('Welcome screen element not found');
        }
        
        // Show welcome screen
        console.log('Showing welcome screen...');
        showStep('welcome');
        
        // Initialize Vanta.js background
        console.log('Initializing Vanta.js...');
        if (typeof VANTA !== 'undefined') {
            if (document.readyState === 'complete') {
                initVanta();
            } else {
                window.addEventListener('load', initVanta);
            }
        } else {
            console.warn('VANTA is not defined. Background animation will not be available.');
            document.body.style.backgroundColor = '#000';
        }
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        // Fallback in case of error
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
        document.body.style.padding = '20px';
        document.body.style.fontFamily = 'Arial, sans-serif';
        document.body.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #fff; font-size: 24px; margin-bottom: 20px;">SLD Screening Tool</h1>
                <div style="background: #1a1a1a; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #ef4444; margin-top: 0;">Error Initializing Application</h2>
                    <p style="color: #e5e7eb;">${error.message || 'An unknown error occurred'}</p>
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 20px;">
                        Please check the browser console for more details.
                    </p>
                    <button 
                        onclick="window.location.reload()" 
                        style="
                            margin-top: 20px;
                            padding: 10px 20px;
                            background: #7c3aed;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 16px;
                        "
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        `;
    }
}

// Set up event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Use event delegation for better performance and reliability
    document.addEventListener('click', (e) => {
        // Navigation buttons
        if (e.target.matches('#start-btn, #start-btn *')) {
            e.preventDefault();
            showStep('registration');
        } else if (e.target.matches('#back-to-welcome, #back-to-welcome *')) {
            e.preventDefault();
            showStep('welcome');
        } else if (e.target.matches('#edit-profile, #edit-profile *')) {
            e.preventDefault();
            showStep('registration');
        } else if (e.target.matches('#start-screening, #start-screening *')) {
            e.preventDefault();
            startScreening();
        } else if (e.target.matches('#new-screening, #new-screening *')) {
            e.preventDefault();
            startNewScreening();
        } 
        // Question navigation
        else if (e.target.matches('#prev-question, #prev-question *')) {
            e.preventDefault();
            console.log('Previous question button clicked');
            prevQuestion();
        } else if (e.target.matches('#next-question, #next-question *')) {
            e.preventDefault();
            console.log('Next question button clicked');
            nextQuestion();
        } else if (e.target.matches('#submit-answers, #submit-answers *')) {
            e.preventDefault();
            console.log('Submit answers button clicked');
            submitAnswers();
        }
        // Report actions
        else if (e.target.matches('#download-pdf, #download-pdf *')) {
            e.preventDefault();
            downloadReport();
        } else if (e.target.matches('#print-report, #print-report *')) {
            e.preventDefault();
            printReport();
        }
        // Photo upload
        else if (e.target.matches('#camera-btn, #camera-btn *')) {
            e.preventDefault();
            document.getElementById('photo')?.click();
        }
    });
    
    // Form submission
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    
    // Photo change handler
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
    
    console.log('Event listeners set up successfully');
}

// Show a specific step
function showStep(step) {
    console.log(`Showing step: ${step}`);
    
    try {
        // Hide all steps
        const screens = document.querySelectorAll('[id$="-screen"]');
        console.log(`Found ${screens.length} screen elements`);
        
        screens.forEach(el => {
            el.classList.add('hidden');
        });
        
        // Show the requested step
        const stepId = `${step}-screen`;
        const stepElement = document.getElementById(stepId);
        
        if (stepElement) {
            console.log(`Found step element: #${stepId}`);
            stepElement.classList.remove('hidden');
            currentStep = step;
            
            // Special handling for specific steps
            if (step === 'welcome') {
                console.log('Welcome screen shown');
            } else if (step === 'registration') {
                console.log('Registration screen shown');
            } else if (step === 'profile') {
                updateProfilePreview();
            } else if (step === 'questions') {
                loadQuestions();
            } else if (step === 'results') {
                generateReport();
            }
        } else {
            console.error(`Step element not found: #${stepId}`);
            // Fallback to welcome screen if step not found
            if (step !== 'welcome') {
                console.log('Falling back to welcome screen');
                showStep('welcome');
            } else {
                // If welcome screen is not found, show error
                document.body.innerHTML = `
                    <div style="padding: 20px; color: white; background: #1a1a1a; min-height: 100vh;">
                        <h1>Error</h1>
                        <p>Could not initialize the application. Required elements are missing.</p>
                        <p>Please check the console for more details.</p>
                        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
                            Reload Page
                        </button>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error in showStep:', error);
        document.body.innerHTML = `
            <div style="padding: 20px; color: white; background: #1a1a1a; min-height: 100vh;">
                <h1>Error</h1>
                <p>An error occurred while loading the application.</p>
                <p>${error.message}</p>
                <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
                    Reload Page
                </button>
            </div>
        `;
    }
}

// Handle registration form submission
function handleRegistration(e) {
    e.preventDefault();
    
    // Get form data
    userProfile = {
        ...userProfile,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        grade: document.getElementById('grade').value,
        date: new Date().toLocaleDateString()
    };
    
    // Show profile preview
    showStep('profile');
}

// Update profile preview with user data
function updateProfilePreview() {
    document.getElementById('profile-name').textContent = userProfile.name;
    document.getElementById('profile-age').textContent = userProfile.age;
    document.getElementById('profile-gender').textContent = userProfile.gender;
    document.getElementById('profile-grade').textContent = userProfile.grade;
    
    // Update photo if available
    const photoPreview = document.getElementById('profile-photo');
    if (userProfile.photo) {
        photoPreview.src = userProfile.photo;
        photoPreview.classList.remove('hidden');
    } else {
        photoPreview.classList.add('hidden');
    }
}

// Handle photo upload
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        userProfile.photo = event.target.result;
        
        // Update preview
        const previews = document.querySelectorAll('#photo-preview, #profile-photo');
        previews.forEach(preview => {
            preview.src = userProfile.photo;
            preview.classList.remove('hidden');
        });
    };
    reader.readAsDataURL(file);
}

// Start the screening process
function startScreening() {
    try {
        console.log('Starting screening process...');
        // Reset answers and question index
        answers = {};
        currentQuestionIndex = 0;
        
        // Load questions first
        loadQuestions();
        
        // Show questions screen
        showStep('questions');
        
        // Show first question
        showQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Error in startScreening:', error);
        showError('Failed to start screening. Please try again.');
    }
}

// Load questions into the UI
function loadQuestions() {
    try {
        showLoading('Loading questions...');
        
        // Flatten questions from all categories
        questions = [];
        for (const category in QUESTIONS_DATA) {
            questions = [...questions, ...QUESTIONS_DATA[category].questions];
        }
        
        // Update question count
        document.getElementById('total-questions').textContent = questions.length;
        
        // Show first question
        showQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Error loading questions:', error);
        showError('Failed to load questions. Please refresh the page.');
    } finally {
        hideLoading();
    }
}

// Show a specific question
function showQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    const question = questions[index];
    const questionContainer = document.getElementById('question-container');
    
    if (!questionContainer) return;
    
    // Update question text
    questionContainer.querySelector('.question-text').textContent = question.text;
    
    // Update options
    const optionsContainer = questionContainer.querySelector('.options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        optionDiv.innerHTML = `
            <input type="radio" 
                   id="option-${question.id}-${option.value}" 
                   name="answer-${question.id}" 
                   value="${option.value}" 
                   ${answers[question.id] === option.value.toString() ? 'checked' : ''}>
            <label for="option-${question.id}-${option.value}">
                ${option.text}
            </label>
        `;
        
        // Add click handler to the entire option div
        optionDiv.addEventListener('click', () => {
            const radio = optionDiv.querySelector('input[type="radio"]');
            radio.checked = true;
            saveCurrentAnswer();
        });
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prev-question').disabled = index === 0;
    document.getElementById('next-question').style.display = index < questions.length - 1 ? 'block' : 'none';
    document.getElementById('submit-answers').style.display = index === questions.length - 1 ? 'block' : 'none';
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    const progress = ((index + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Navigate to the next question
function nextQuestion() {
    console.log('Next button clicked. Current question index:', currentQuestionIndex);
    
    try {
        // Save current answer
        saveCurrentAnswer();
        
        // Check if we have more questions
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            console.log('Moving to question:', currentQuestionIndex + 1);
            
            // Show the next question
            showQuestion(currentQuestionIndex);
            
            // Update progress
            updateProgressBar();
            updateNavigationButtons();
            
            // Scroll to top of question
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.log('Last question reached, submitting answers...');
            // If this is the last question, submit the answers
            submitAnswers();
        }
    } catch (error) {
        console.error('Error in nextQuestion:', error);
        showError('An error occurred while moving to the next question.');
    }
}

// Navigate to the previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        
        // Update progress bar
        updateProgressBar();
        
        // Show/hide navigation buttons
        updateNavigationButtons();
    }
}

// Update the progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// Update navigation buttons visibility
function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const submitButton = document.getElementById('submit-answers');
    
    if (prevButton) {
        prevButton.disabled = currentQuestionIndex === 0;
    }
    
    if (nextButton && submitButton) {
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        nextButton.style.display = isLastQuestion ? 'none' : 'block';
        submitButton.style.display = isLastQuestion ? 'block' : 'none';
    }
}

// Save the current answer
function saveCurrentAnswer() {
    const selectedOption = document.querySelector('input[name^="answer-"]:checked');
    if (selectedOption) {
        const questionId = selectedOption.name.replace('answer-', '');
        answers[questionId] = selectedOption.value;
    }
}

// Submit all answers
function submitAnswers() {
    try {
        console.log('Submitting answers...');
        saveCurrentAnswer();
        console.log('Answers saved, showing results...');
        
        // First show the results screen
        const resultsScreen = document.getElementById('results-screen');
        if (resultsScreen) {
            resultsScreen.classList.remove('hidden');
            
            // Hide other screens
            document.querySelectorAll('[id$="-screen"]').forEach(screen => {
                if (screen.id !== 'results-screen') {
                    screen.classList.add('hidden');
                }
            });
            
            // Then generate the report
            console.log('Generating report...');
            generateReport();
        } else {
            console.error('Results screen element not found');
            showError('Could not display results. Please try again.');
        }
    } catch (error) {
        console.error('Error in submitAnswers:', error);
        showError('Failed to process your answers. Please try again.');
    }
}

// Generate and display the report
function generateReport() {
    try {
        showLoading('Generating report...');
        
        // Calculate scores
        const scores = {};
        const categoryScores = {};
        
        // Initialize scores
        for (const category in QUESTIONS_DATA) {
            scores[category] = 0;
            categoryScores[category] = { score: 0, total: 0 };
        }
        
        // Calculate scores for each category
        for (const [questionId, answer] of Object.entries(answers)) {
            for (const [category, data] of Object.entries(QUESTIONS_DATA)) {
                const question = data.questions.find(q => q.id === questionId);
                if (question) {
                    const points = parseInt(answer);
                    scores[category] += points;
                    categoryScores[category].score += points;
                    categoryScores[category].total += 3; // Max points per question
                    break;
                }
            }
        }
        
        // Calculate percentages and severities
        const results = [];
        for (const [category, data] of Object.entries(QUESTIONS_DATA)) {
            const score = scores[category];
            const maxScore = data.questions.length * 3;
            const percentage = Math.round((score / maxScore) * 100);
            const severity = getSeverity(score, data.thresholds);
            
            results.push({
                category,
                description: data.desc,
                score,
                maxScore,
                percentage,
                severity
            });
        }
        
        // Sort by score (descending)
        results.sort((a, b) => b.percentage - a.percentage);
        
        // Generate narrative
        const narrative = generateNarrative(results);
        
        // Generate recommendations
        const recommendations = generateRecommendations(results);
        
        // Update UI with results
        updateResultsUI({
            results,
            narrative,
            recommendations,
            categoryScores: results.reduce((acc, curr) => {
                acc[curr.category] = curr.percentage;
                return acc;
            }, {}),
            severity_distribution: {
                low: results.filter(r => r.severity === 'Low').length,
                moderate: results.filter(r => r.severity === 'Moderate').length,
                high: results.filter(r => r.severity === 'High').length
            }
        });
        
    } catch (error) {
        console.error('Error generating report:', error);
        showError('Failed to generate report. Please try again.');
    } finally {
        hideLoading();
    }
}

// Generate narrative based on results
function generateNarrative(results) {
    const primaryConcerns = results.filter(r => r.severity === 'High' || r.severity === 'Moderate');
    
    let narrative = `This screening indicates `;
    
    if (primaryConcerns.length === 0) {
        narrative += 'no significant areas of concern were identified. ';
    } else {
        const concernNames = primaryConcerns.map(c => c.category).join(', ');
        narrative += `potential concerns in the following areas: ${concernNames}. `;
    }
    
    // Add specific observations
    for (const result of results) {
        if (result.severity === 'High') {
            narrative += `Significant difficulties were noted in ${result.category.toLowerCase()}, with a score of ${result.score}/${result.maxScore}. `;
        } else if (result.severity === 'Moderate') {
            narrative += `Some concerns were noted in ${result.category.toLowerCase()}, with a score of ${result.score}/${result.maxScore}. `;
        }
    }
    
    narrative += 'This screening is not a diagnosis but suggests areas that may require further evaluation by a qualified professional.';
    
    return narrative;
}

// Generate recommendations based on results
function generateRecommendations(results) {
    const recommendations = [
        'Share these results with the student\'s parents/guardians and teachers',
        'Consider a comprehensive educational evaluation if concerns persist',
        'Implement targeted interventions based on the areas of concern',
        'Monitor progress with regular follow-up assessments'
    ];
    
    // Add specific recommendations based on areas of concern
    for (const result of results) {
        if (result.severity === 'High') {
            if (result.category === 'Dyslexia') {
                recommendations.push('Consider multisensory reading interventions (e.g., Orton-Gillingham approach)');
                recommendations.push('Provide audiobooks and text-to-speech tools');
            } else if (result.category === 'Dysgraphia') {
                recommendations.push('Allow use of speech-to-text software for written assignments');
                recommendations.push('Provide graphic organizers for writing tasks');
            } else if (result.category === 'Dyscalculia') {
                recommendations.push('Use manipulatives and visual aids for math concepts');
                recommendations.push('Provide a calculator for complex calculations');
            }
        }
    }
    
    return recommendations;
}

// Update the UI with results
function updateResultsUI(report) {
    // Update report date
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update student info
    document.getElementById('result-name').textContent = userProfile.name;
    document.getElementById('result-age').textContent = userProfile.age;
    document.getElementById('result-gender').textContent = userProfile.gender;
    document.getElementById('result-grade').textContent = userProfile.grade;
    
    const resultPhoto = document.getElementById('result-photo');
    if (userProfile.photo) {
        resultPhoto.src = userProfile.photo;
        resultPhoto.classList.remove('hidden');
    } else {
        resultPhoto.classList.add('hidden');
    }
    
    // Update analysis text
    document.getElementById('analysis-text').textContent = report.narrative;
    
    // Update recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
        report.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-300">${rec}</span>
            `;
            recommendationsList.appendChild(li);
        });
    }
    
    // Create charts
    createCharts(report);
}

// Create charts for results
function createCharts(report) {
    // Results Chart
    const resultsCtx = document.getElementById('results-chart')?.getContext('2d');
    if (resultsCtx) {
        // Destroy previous chart if it exists
        if (window.resultsChart) {
            window.resultsChart.destroy();
        }
        
        const categories = report.results.map(r => r.category);
        const percentages = report.results.map(r => r.percentage);
        const backgroundColors = report.results.map(r => 
            r.severity === 'High' ? 'rgba(239, 68, 68, 0.7)' : 
            r.severity === 'Moderate' ? 'rgba(245, 158, 11, 0.7)' : 
            'rgba(16, 185, 129, 0.7)'
        );
        
        window.resultsChart = new Chart(resultsCtx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Score (%)',
                    data: percentages,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(c => c.replace('0.7', '1')),
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.7
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#9CA3AF',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#E5E7EB',
                            font: {
                                weight: '500'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const result = report.results[context.dataIndex];
                                return [
                                    `Score: ${result.score}/${result.maxScore}`,
                                    `Severity: ${result.severity}`
                                ];
                            }
                        },
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#F3F4F6',
                        bodyColor: '#D1D5DB',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }
                }
            }
        });
    }
    
    // Severity Distribution Chart
    const severityCtx = document.getElementById('severity-chart')?.getContext('2d');
    if (severityCtx) {
        // Destroy previous chart if it exists
        if (window.severityChart) {
            window.severityChart.destroy();
        }
        
        const severityData = {
            labels: ['Low', 'Moderate', 'High'],
            datasets: [{
                data: [
                    report.severity_distribution.low || 0,
                    report.severity_distribution.moderate || 0,
                    report.severity_distribution.high || 0
                ],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4
            }]
        };
        
        window.severityChart = new Chart(severityCtx, {
            type: 'doughnut',
            data: severityData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#E5E7EB',
                            padding: 20,
                            font: {
                                size: 13
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const value = context.raw || 0;
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        },
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#F3F4F6',
                        bodyColor: '#D1D5DB',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }
                },
                cutout: '70%',
                radius: '90%'
            }
        });
    }
}

// Determine severity based on scores
function getSeverity(score, thresholds) {
    if (score >= thresholds.high) return 'High';
    if (score >= thresholds.moderate) return 'Moderate';
    return 'Low';
}

// Download report as PDF
function downloadReport() {
    const element = document.getElementById('results-screen');
    const opt = {
        margin: 10,
        filename: `SLD_Screening_${userProfile.name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Show loading
    showLoading('Generating PDF...');
    
    // Generate PDF
    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            hideLoading();
        })
        .catch(err => {
            console.error('Error generating PDF:', err);
            hideLoading();
            showError('Failed to generate PDF. Please try again or use the print option.');
        });
}

// Print the report
function printReport() {
    window.print();
}

// Start a new screening
function startNewScreening() {
    // Reset answers and user profile
    answers = {};
    userProfile = {
        name: '',
        age: '',
        gender: '',
        grade: '',
        photo: '',
        date: new Date().toLocaleDateString()
    };
    
    // Reset form
    const form = document.getElementById('registration-form');
    if (form) form.reset();
    
    // Reset photo previews
    document.querySelectorAll('#photo-preview, #profile-photo').forEach(el => {
        el.src = '';
        el.classList.add('hidden');
    });
    const overlay = document.getElementById('loading-overlay');
    const messageEl = document.getElementById('loading-message');
    const progressBar = document.getElementById('loading-progress');
    
    if (!overlay || !messageEl) return;
    
    messageEl.textContent = message;
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Ensure focus is managed for accessibility
    overlay.setAttribute('aria-busy', 'true');
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    
    // Move focus to loading overlay for screen readers
    setTimeout(() => {
        overlay.focus();
    }, 100);
    
    // Add a small delay to ensure the overlay is visible before any heavy processing
    return new Promise(resolve => setTimeout(resolve, 100));
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    
    // Add a small delay for smoother transition
    setTimeout(() => {
        overlay.classList.add('opacity-0');
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.classList.remove('opacity-0');
            document.body.style.overflow = '';
            
            // Reset accessibility attributes
            overlay.removeAttribute('aria-busy');
            overlay.removeAttribute('role');
            overlay.removeAttribute('aria-live');
        }, 300);
    }, 300);
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md animate-fade-in-down';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <p class="font-medium">Error</p>
                <p class="text-sm opacity-90">${message}</p>
            </div>
            <button class="ml-4 text-white opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
