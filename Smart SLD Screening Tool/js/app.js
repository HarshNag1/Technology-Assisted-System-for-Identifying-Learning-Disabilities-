const App = {
    state: {
        currentView: 'welcome',
        currentPartIndex: 0,
        profile: {},
        responses: {},
        scores: {}
    },

    init: function () {
        console.log("App Initialized");
        // Initial view is already static in HTML, but we can re-render if needed
        // this.renderView('welcome');
    },

    startAppGalaxy: function () {
        const dashboard = document.getElementById('solar-dashboard');
        const appContainer = document.getElementById('app-container');

        // Smooth transition out
        dashboard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'scale(1.05)';

        setTimeout(() => {
            dashboard.style.display = 'none';
            appContainer.classList.remove('hidden');

            // Render registration form and wire it up
            App.startRegistration();
        }, 800);
    },

    startRegistration: function () {
        UI.renderView('registration');

        // Camera Handling
        const video = document.getElementById('camera-feed');
        const placeholder = document.getElementById('camera-placeholder');
        const startBtn = document.getElementById('start-camera-btn');
        const captureBtn = document.getElementById('capture-btn');
        const retakeBtn = document.getElementById('retake-btn');
        const preview = document.getElementById('photo-preview');
        const controls = document.getElementById('camera-controls');
        const retakeControls = document.getElementById('retake-controls');

        let photoData = null;

        startBtn.addEventListener('click', async () => {
            const success = await Camera.init(video);
            if (success) {
                video.classList.remove('hidden');
                placeholder.classList.add('hidden');
                startBtn.classList.add('hidden');
                controls.classList.remove('hidden');
            }
        });

        captureBtn.addEventListener('click', () => {
            photoData = Camera.capture(video);
            if (photoData) {
                preview.src = photoData;
                preview.classList.remove('hidden');
                video.classList.add('hidden');
                controls.classList.add('hidden');
                retakeControls.classList.remove('hidden');
                Camera.stop();
            }
        });

        retakeBtn.addEventListener('click', async () => {
            const success = await Camera.init(video);
            if (success) {
                preview.classList.add('hidden');
                video.classList.remove('hidden');
                retakeControls.classList.add('hidden');
                controls.classList.remove('hidden');
                photoData = null;
            }
        });

        document.getElementById('registration-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.state.profile = {
                name: formData.get('name'),
                age: formData.get('age'),
                grade: formData.get('grade'),
                gender: formData.get('gender'),
                photo: photoData
            };
            this.showProfileReview();
        });
    },

    showProfileReview: function () {
        UI.renderView('profileReview');

        // Populate profile data
        document.getElementById('review-name').textContent = this.state.profile.name;
        document.getElementById('review-age').textContent = this.state.profile.age + ' Years';
        document.getElementById('review-grade').textContent = this.state.profile.grade;
        document.getElementById('review-gender').textContent = this.state.profile.gender;

        // Display photo
        const reviewImg = document.getElementById('review-photo');
        const reviewContainer = document.getElementById('review-photo-container');
        if (this.state.profile.photo) {
            reviewImg.src = this.state.profile.photo;
            reviewImg.style.display = 'block';
        } else {
            // Initials placeholder
            const initials = this.state.profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            reviewContainer.innerHTML = `
                <div class="w-full h-full flex items-center justify-center text-3xl font-bold" style="background:linear-gradient(135deg,#059669,#10b981);color:#fff;">
                    ${initials}
                </div>
            `;
        }
    },

    editProfile: function () {
        UI.renderView('registration');
        this.startRegistration();

        // Pre-fill form with existing data
        setTimeout(() => {
            document.querySelector('input[name="name"]').value = this.state.profile.name;
            document.querySelector('input[name="age"]').value = this.state.profile.age;
            document.querySelector('input[name="grade"]').value = this.state.profile.grade;
            document.querySelector('select[name="gender"]').value = this.state.profile.gender;

            // Show photo preview if exists
            if (this.state.profile.photo) {
                const preview = document.getElementById('photo-preview');
                preview.src = this.state.profile.photo;
                preview.classList.remove('hidden');
                document.getElementById('camera-placeholder').classList.add('hidden');
                document.getElementById('retake-controls').classList.remove('hidden');
            }
        }, 100);
    },

    startQuizFromReview: function () {
        this.startQuiz();
    },

    startQuiz: function () {
        this.state.currentPartIndex = 0;
        this.state.responses = {};
        UI.renderView('quiz');
        this.renderCurrentPart();
        this.setupQuizNavigation();
    },

    renderCurrentPart: function () {
        const part = QUESTION_DATA[this.state.currentPartIndex];

        // Update Header
        document.getElementById('part-title').textContent = `Part ${part.id.toUpperCase()}: ${part.title}`;

        // Update Progress
        const progress = ((this.state.currentPartIndex) / QUESTION_DATA.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;

        // Render Questions
        UI.renderQuestions(part, 0);

        // Update Buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.state.currentPartIndex === 0;
        nextBtn.innerHTML = this.state.currentPartIndex === QUESTION_DATA.length - 1
            ? 'Finish Assessment <i class="fas fa-check ml-2"></i>'
            : 'Next Part <i class="fas fa-arrow-right ml-2"></i>';

        // Restore previous answers if any
        this.restoreAnswers(part.id);
        // Update visual selection state (JS-based radio system)
        if (typeof UI.restoreAnswersUI === 'function') UI.restoreAnswersUI();
    },

    setupQuizNavigation: function () {
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (this.state.currentPartIndex > 0) {
                this.saveCurrentAnswers();
                this.state.currentPartIndex--;
                this.renderCurrentPart();
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (this.validateCurrentPart()) {
                this.saveCurrentAnswers();
                if (this.state.currentPartIndex < QUESTION_DATA.length - 1) {
                    this.state.currentPartIndex++;
                    this.renderCurrentPart();
                } else {
                    this.finishAssessment();
                }
            } else {
                alert("Please answer all questions before proceeding.");
            }
        });
    },

    validateCurrentPart: function () {
        const part = QUESTION_DATA[this.state.currentPartIndex];
        let allAnswered = true;

        part.questions.forEach((_, idx) => {
            const name = `${part.id}${idx}`;
            if (!document.querySelector(`input[name="${name}"]:checked`)) {
                allAnswered = false;
            }
        });

        return allAnswered;
    },

    saveCurrentAnswers: function () {
        const part = QUESTION_DATA[this.state.currentPartIndex];
        part.questions.forEach((_, idx) => {
            const name = `${part.id}${idx}`;
            const selected = document.querySelector(`input[name="${name}"]:checked`);
            if (selected) {
                this.state.responses[name] = selected.value;
            }
        });
    },

    restoreAnswers: function (partId) {
        const part = QUESTION_DATA[this.state.currentPartIndex];
        part.questions.forEach((_, idx) => {
            const name = `${partId}${idx}`;
            if (this.state.responses[name]) {
                const radio = document.querySelector(`input[name="${name}"][value="${this.state.responses[name]}"]`);
                if (radio) radio.checked = true;
            }
        });
    },

    devAutoFill: function (level) {
        // level: 0 (Never/Low Risk), 2 (Sometimes/Mod), 3 (Always/High Risk), or -1 (Random)
        if (!QUESTION_DATA) return;
        
        QUESTION_DATA.forEach(part => {
            part.questions.forEach((_, idx) => {
                const name = `${part.id}${idx}`;
                let value;
                if (level === -1) {
                    value = Math.floor(Math.random() * 4).toString();
                } else {
                    value = level.toString();
                }
                this.state.responses[name] = value;
            });
        });
        
        // Skip remaining navigation and display the results instantly
        this.finishAssessment();
    },

    finishAssessment: function () {
        // Calculate Scores
        this.state.scores = Logic.calculateScores(this.state.responses);
        const recommendations = Logic.getRecommendations(this.state.scores);

        // Render Results View
        UI.renderView('results');

        // Update Profile Info
        document.getElementById('result-name').textContent = this.state.profile.name;

        const avatarContainer = document.getElementById('result-initials').parentElement;
        if (this.state.profile.photo) {
            avatarContainer.innerHTML = `<img src="${this.state.profile.photo}" class="w-full h-full object-cover rounded-full" style="border:2px solid rgba(20,184,166,0.4);">`;
            avatarContainer.classList.remove('bg-gradient-to-br', 'from-blue-500', 'to-slate-500', 'flex', 'items-center', 'justify-center');
            avatarContainer.classList.add('overflow-hidden');
        } else {
            document.getElementById('result-initials').textContent = this.state.profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        }

        document.getElementById('result-details').textContent = `${this.state.profile.age} Years • Grade ${this.state.profile.grade}`;

        // Populate all new UI elements
        UI.populateOverallStats(this.state.scores);
        UI.renderCategoryCards(this.state.scores);
        UI.renderRadarChart(this.state.scores);
        UI.renderDonutChart(this.state.scores);
        UI.renderStrengthsAndConcerns(this.state.scores);
        UI.renderRecommendations(recommendations);
    },

    downloadPDF: function () {
        const recommendations = Logic.getRecommendations(this.state.scores);
        PDFExport.generate(this.state.profile, this.state.scores, recommendations);
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
