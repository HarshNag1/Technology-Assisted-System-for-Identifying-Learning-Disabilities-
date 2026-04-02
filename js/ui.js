/* =============================================================
   UI.js — Smart SLD Screening Tool
   White/Light Glassmorphism Theme (Emerald/Amber) + Dev Panel
   ============================================================= */

const UI = {
    elements: {
        appContent: document.getElementById('app-content'),
    },

    views: {

        /* -------------------------------------------------------
           REGISTRATION FORM
        ------------------------------------------------------- */
        registration: `
            <div class="w-full max-w-lg mx-auto animate-fade-in">

                <div class="text-center mb-8">
                    <span class="badge badge-emerald mb-3">Step 1 of 3</span>
                    <h2 class="font-display text-3xl font-bold" style="color:#171717;">Student Profile</h2>
                    <p class="text-sm mt-1" style="color:#737373;">Enter the student's information to begin the assessment.</p>
                </div>

                <div class="neu-card">
                    <form id="registration-form" class="space-y-5">

                        <div>
                            <label class="form-label">Full Name</label>
                            <input type="text" name="name" required
                                class="neu-input"
                                placeholder="Enter student's full name">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">Age</label>
                                <input type="number" name="age" required min="4" max="25"
                                    class="neu-input"
                                    placeholder="Years">
                            </div>
                            <div>
                                <label class="form-label">Grade / Class</label>
                                <input type="text" name="grade" required
                                    class="neu-input"
                                    placeholder="e.g. Grade 5">
                            </div>
                        </div>

                        <div>
                            <label class="form-label">Gender</label>
                            <div class="relative">
                                <select name="gender" class="neu-input appearance-none pr-10" style="color:#171717;">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style="color:#737373;">
                                    <i class="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <!-- Camera Section -->
                        <div>
                            <label class="form-label">
                                Student Photo
                                <span style="font-weight:400;text-transform:none;letter-spacing:0;color:#a3a3a3;"> — Optional</span>
                            </label>

                            <div class="relative w-full rounded-xl overflow-hidden flex items-center justify-center"
                                style="aspect-ratio:16/9;background:#fafafa;border:2px dashed rgba(0,0,0,0.08);">
                                <video id="camera-feed" autoplay playsinline class="absolute inset-0 w-full h-full object-cover hidden rounded-xl"></video>

                                <div id="photo-preview-container" class="absolute inset-0 w-full h-full hidden rounded-xl overflow-hidden">
                                    <img id="photo-preview" class="w-full h-full object-cover">
                                </div>

                                <div id="camera-placeholder" class="text-center p-8">
                                    <div class="icon-circle w-14 h-14 mx-auto mb-3" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);">
                                        <i class="fas fa-camera text-lg" style="color:#10b981;"></i>
                                    </div>
                                    <p class="text-sm font-medium" style="color:#737373;">Click below to activate camera</p>
                                </div>

                                <div id="camera-controls" class="absolute bottom-4 left-0 right-0 flex justify-center gap-3 hidden z-20">
                                    <button type="button" id="capture-btn" class="btn-primary" style="box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
                                        <i class="fas fa-camera"></i> Capture Photo
                                    </button>
                                </div>

                                <div id="retake-controls" class="absolute top-3 right-3 hidden z-20">
                                    <button type="button" id="retake-btn"
                                        class="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                                        style="background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.2);"
                                        onmouseover="this.style.background='rgba(239,68,68,0.15)'"
                                        onmouseout="this.style.background='rgba(239,68,68,0.1)'">
                                        <i class="fas fa-times text-sm"></i>
                                    </button>
                                </div>
                            </div>

                            <button type="button" id="start-camera-btn"
                                class="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                style="border:1.5px dashed rgba(0,0,0,0.1);color:#737373;background:transparent;"
                                onmouseover="this.style.borderColor='rgba(16,185,129,0.3)';this.style.color='#059669';this.style.background='rgba(16,185,129,0.05)';"
                                onmouseout="this.style.borderColor='rgba(0,0,0,0.1)';this.style.color='#737373';this.style.background='transparent';">
                                <i class="fas fa-camera mr-2"></i>Open Camera
                            </button>
                        </div>

                        <div class="pt-2">
                            <button type="submit" class="btn-primary w-full justify-center font-bold text-base py-4">
                                Continue to Verification
                                <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,

        /* -------------------------------------------------------
           PROFILE REVIEW
        ------------------------------------------------------- */
        profileReview: `
            <div class="w-full max-w-2xl mx-auto animate-fade-in">

                <div class="text-center mb-8">
                    <span class="badge badge-emerald mb-3">Step 2 of 3</span>
                    <h2 class="font-display text-3xl font-bold" style="color:#171717;">Candidate Verification</h2>
                    <p class="text-sm mt-1" style="color:#737373;">Confirm the student's details before starting the assessment.</p>
                </div>

                <div class="neu-card overflow-hidden p-0">

                    <!-- Top color bar -->
                    <div style="height:4px;background:linear-gradient(90deg,#059669,#10b981,#eab308);"></div>

                    <div class="flex flex-col md:flex-row">
                        <!-- Photo Panel -->
                        <div class="flex flex-col items-center justify-center p-8 md:w-52 flex-shrink-0"
                            style="background:#fafafa;border-right:1px solid rgba(0,0,0,0.05);">
                            <div id="review-photo-container"
                                class="w-32 h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center font-bold text-2xl"
                                style="border:3px solid rgba(16,185,129,0.3);background:rgba(16,185,129,0.1);box-shadow:0 0 15px rgba(16,185,129,0.15);">
                                <img id="review-photo" src="" alt="Photo" class="w-full h-full object-cover rounded-full" style="display:none;">
                            </div>
                            <span class="badge badge-green">
                                <i class="fas fa-check-circle"></i> Verified
                            </span>
                        </div>

                        <!-- Details Panel -->
                        <div class="flex-1 p-8">
                            <div class="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p class="form-label">Full Name</p>
                                    <p id="review-name" class="text-xl font-display font-bold pb-2" style="color:#171717;border-bottom:1px solid rgba(0,0,0,0.06);">—</p>
                                </div>
                                <div>
                                    <p class="form-label">Assessment ID</p>
                                    <p class="text-sm font-mono pb-2" style="color:#737373;border-bottom:1px solid rgba(0,0,0,0.06);">SLD-2026</p>
                                </div>
                                <div>
                                    <p class="form-label">Grade / Class</p>
                                    <p id="review-grade" class="text-base font-bold" style="color:#171717;">—</p>
                                </div>
                                <div>
                                    <p class="form-label">Age / Gender</p>
                                    <p class="text-base font-bold" style="color:#171717;">
                                        <span id="review-age">—</span> / <span id="review-gender">—</span>
                                    </p>
                                </div>
                            </div>

                            <div class="flex gap-3">
                                <button onclick="App.editProfile()" class="btn-secondary px-5 py-2.5 text-sm">
                                    <i class="fas fa-pencil"></i> Edit Details
                                </button>
                                <button onclick="App.startQuizFromReview()" class="btn-primary flex-1 justify-center py-2.5 font-bold group">
                                    Confirm &amp; Start
                                    <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="text-center text-xs mt-4" style="color:#a3a3a3;">
                    <i class="fas fa-info-circle mr-1"></i>
                    Assessment covers 10 domains. Ensure a quiet environment before proceeding.
                </p>
            </div>
        `,

        /* -------------------------------------------------------
           QUIZ
        ------------------------------------------------------- */
        quiz: `
            <div class="w-full max-w-6xl mx-auto animate-fade-in flex flex-col lg:flex-row gap-6 items-start">

                <!-- MAIN CONTENT (Left) -->
                <div class="flex-1 w-full flex flex-col gap-5">
                    <!-- HUD -->
                    <div class="quiz-hud">
                        <div class="flex items-center gap-3">
                            <div class="icon-circle w-10 h-10 flex-shrink-0" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);">
                                <i id="part-icon" class="fas fa-book-open text-sm" style="color:#059669;"></i>
                            </div>
                            <div>
                                <h3 id="part-title" class="font-display font-bold text-sm leading-tight" style="color:#171717;">Part A: Reading</h3>
                                <p class="text-xs" style="color:#737373;">Assessment in progress</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="hidden md:block text-right">
                                <span class="text-xs font-bold block text-gradient-primary">PROGRESS</span>
                                <span id="progress-text" class="text-sm font-mono font-bold" style="color:#171717;">0%</span>
                            </div>
                            <div style="width:140px;">
                                <div class="progress-track">
                                    <div id="progress-bar" class="progress-fill" style="width:0%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Question Card -->
                    <div class="neu-card" style="padding:2rem 2.5rem;">
                        <div id="questions-container" class="space-y-10"></div>

                        <!-- Navigation -->
                        <div class="mt-8 pt-5 flex justify-between items-center" style="border-top:1px solid rgba(0,0,0,0.06);">
                            <button id="prev-btn" class="btn-secondary px-5 py-2.5 text-sm">
                                <i class="fas fa-arrow-left"></i> Previous
                            </button>
                            <button id="next-btn" class="btn-primary px-8 py-2.5 font-bold group">
                                Next Part <i class="fas fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- DEV SIDEBAR (Right) -->
                <div class="w-full lg:w-64 flex-shrink-0">
                    <div class="dev-panel">
                        <h4><i class="fas fa-code text-gradient-primary"></i> Dev Options</h4>
                        <div class="text-xs mb-3" style="color:#737373;line-height:1.4;">Directly auto-fill the entire test and jump to results.</div>
                        <button onclick="App.devAutoFill(0)" class="dev-btn dev-btn-green">
                            <i class="fas fa-check-circle"></i> Fast: Low Risk
                        </button>
                        <button onclick="App.devAutoFill(2)" class="dev-btn dev-btn-amber">
                            <i class="fas fa-adjust"></i> Fast: Moderate
                        </button>
                        <button onclick="App.devAutoFill(3)" class="dev-btn dev-btn-red">
                            <i class="fas fa-exclamation-circle"></i> Fast: High Risk
                        </button>
                        <div style="height:1px;background:rgba(0,0,0,0.06);margin:10px 0;"></div>
                        <button onclick="App.devAutoFill(-1)" class="dev-btn dev-btn-pink">
                            <i class="fas fa-dice"></i> Fast: Randomize
                        </button>
                    </div>
                </div>

            </div>
        `,

        /* -------------------------------------------------------
           RESULTS
        ------------------------------------------------------- */
        results: `
            <div class="w-full max-w-5xl mx-auto animate-fade-in pb-16 space-y-7">

                <!-- Header -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-5"
                    style="border-bottom:1px solid rgba(0,0,0,0.06);">
                    <div>
                        <span class="badge badge-green mb-2">Assessment Complete</span>
                        <h2 class="font-display text-3xl font-bold" style="color:#171717;">Screening Report</h2>
                        <p class="text-xs font-mono mt-1" style="color:#737373;">GENERATED: <span id="report-date">${new Date().toLocaleDateString()}</span></p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="window.print()" class="btn-secondary px-4 py-2 text-sm">
                            <i class="fas fa-print"></i> Print
                        </button>
                        <button onclick="App.downloadPDF()" class="btn-primary px-5 py-2 text-sm font-bold">
                            <i class="fas fa-download"></i> Export PDF
                        </button>
                    </div>
                </div>

                <!-- KPI Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <!-- Overall Score -->
                    <div class="stat-card flex flex-col items-center justify-center text-center relative overflow-hidden" style="min-height:200px;">
                        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at 50% 0%,rgba(16,185,129,0.1) 0%,transparent 70%);"></div>
                        <p class="text-xs font-bold uppercase tracking-widest mb-3" style="color:#737373;">Overall Score</p>
                        <div>
                            <span class="font-display font-bold" id="overall-score" style="font-size:5rem;color:#171717;line-height:1;text-shadow:0 2px 10px rgba(0,0,0,0.05);">0</span>
                            <span class="font-display font-bold text-3xl text-gradient-primary">%</span>
                        </div>
                        <div id="overall-severity" class="mt-3"></div>
                    </div>

                    <!-- Student Snapshot -->
                    <div class="stat-card flex flex-col justify-between">
                        <div class="flex items-center gap-4 mb-5">
                            <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                                style="border:2px solid rgba(16,185,129,0.4);box-shadow:0 0 10px rgba(16,185,129,0.15);">
                                <div id="result-photo-container"
                                    class="w-full h-full flex items-center justify-center font-bold text-lg"
                                    style="background:rgba(16,185,129,0.1);color:#059669;">
                                    <span id="result-initials">--</span>
                                    <img id="result-photo-mini" src="" class="w-full h-full object-cover hidden">
                                </div>
                            </div>
                            <div>
                                <h3 id="result-name" class="text-lg font-display font-bold" style="color:#171717;">Student Name</h3>
                                <p id="result-details" class="text-sm mt-0.5" style="color:#737373;">—</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 text-center">
                            <div class="p-2 rounded-lg" style="background:#fafafa;border:1px solid rgba(0,0,0,0.05);">
                                <p class="text-xs font-bold uppercase tracking-wider mb-0.5" style="color:#737373;">High</p>
                                <p id="high-count" class="text-lg font-display font-bold" style="color:#ef4444;">0</p>
                            </div>
                            <div class="p-2 rounded-lg" style="background:#fafafa;border:1px solid rgba(0,0,0,0.05);">
                                <p class="text-xs font-bold uppercase tracking-wider mb-0.5" style="color:#737373;">Mod.</p>
                                <p id="moderate-count" class="text-lg font-display font-bold" style="color:#f59e0b;">0</p>
                            </div>
                            <div class="p-2 rounded-lg" style="background:#fafafa;border:1px solid rgba(0,0,0,0.05);">
                                <p class="text-xs font-bold uppercase tracking-wider mb-0.5" style="color:#737373;">Low</p>
                                <p id="low-count" class="text-lg font-display font-bold" style="color:#22c55e;">0</p>
                            </div>
                        </div>
                    </div>

                    <!-- Donut Chart -->
                    <div class="stat-card flex flex-col">
                        <h4 class="text-xs font-bold uppercase tracking-widest mb-4" style="color:#737373;">Risk Distribution</h4>
                        <div class="flex-1" style="min-height:160px;position:relative;">
                            <canvas id="donut-chart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Charts + Insights -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    <!-- Radar Chart -->
                    <div class="neu-card col-span-1 lg:col-span-2">
                        <h3 class="font-display font-bold mb-5 flex items-center gap-2" style="color:#171717;">
                            <i class="fas fa-chart-radar text-sm" style="color:#059669;"></i>
                            Cognitive Profile
                        </h3>
                        <div style="height:300px;position:relative;">
                            <canvas id="radar-chart"></canvas>
                        </div>
                    </div>

                    <!-- Key Insights -->
                    <div class="neu-card p-0 overflow-hidden flex flex-col">
                        <div class="px-6 py-4" style="border-bottom:1px solid rgba(0,0,0,0.06);background:#fafafa;">
                            <h3 class="font-display font-bold text-sm flex items-center gap-2" style="color:#171717;">
                                <i class="fas fa-clipboard-list text-sm" style="color:#059669;"></i>
                                Key Insights
                            </h3>
                        </div>
                        <div class="p-5 space-y-4 overflow-y-auto flex-1" style="max-height:320px;">
                            <div>
                                <h4 class="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style="color:#22c55e;">
                                    <span class="w-2 h-2 rounded-full" style="background:#22c55e;"></span> Strengths
                                </h4>
                                <div id="strengths-list" class="space-y-1.5"></div>
                            </div>
                            <div class="divider"></div>
                            <div>
                                <h4 class="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style="color:#ef4444;">
                                    <span class="w-2 h-2 rounded-full" style="background:#ef4444;"></span> Concerns
                                </h4>
                                <div id="concerns-list" class="space-y-1.5"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Domain Score Cards -->
                <div>
                    <h3 class="font-display text-xl font-bold mb-4" style="color:#171717;">Domain Breakdown</h3>
                    <div id="category-cards" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div>
                </div>

                <!-- Recommendations -->
                <div>
                    <h3 class="font-display text-xl font-bold mb-4" style="color:#171717;">Recommendations</h3>
                    <div id="recommendations-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                </div>

                <!-- Restart -->
                <div class="flex justify-center pt-4">
                    <button onclick="location.reload()" class="btn-secondary text-sm gap-2">
                        <i class="fas fa-rotate-left"></i> Start New Assessment
                    </button>
                </div>
            </div>
        `,
    },

    /* =========================================================
       RENDER A VIEW
    ========================================================= */
    renderView: function (viewName) {
        this.elements.appContent.innerHTML = this.views[viewName];
    },

    /* =========================================================
       RENDER QUESTIONS
    ========================================================= */
    renderQuestions: function (partData, startIndex) {
        const container = document.getElementById('questions-container');
        container.innerHTML = '';

        const iconClass = this.getCategoryIcon(partData.id);
        const iconEl = document.getElementById('part-icon');
        if (iconEl) iconEl.className = `fas ${iconClass}`;

        partData.questions.forEach((q, idx) => {
            const html = `
                <div class="question-item animate-fade-in" style="animation-delay:${idx * 70}ms;">
                    <div class="mb-4">
                        <span class="badge badge-emerald mb-2">Question ${idx + 1}</span>
                        <p class="text-xl font-display font-medium leading-snug" style="color:#171717;">${q}</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        ${this.renderOption(partData.id, idx, 0, 'Never',     'fa-times-circle',    '#a3a3a3')}
                        ${this.renderOption(partData.id, idx, 1, 'Rarely',    'fa-minus-circle',    '#2dd4bf')}
                        ${this.renderOption(partData.id, idx, 2, 'Sometimes', 'fa-adjust',          '#f59e0b')}
                        ${this.renderOption(partData.id, idx, 3, 'Always',    'fa-check-circle',    '#22c55e')}
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });

        // Attach JS-based radio selection (avoids broken CSS sibling selector)
        container.querySelectorAll('.answer-option').forEach(label => {
            label.addEventListener('click', () => {
                const radio = label.querySelector('input[type="radio"]');
                if (!radio) return;
                // Deselect siblings (same question)
                const name = radio.name;
                container.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.answer-option').classList.remove('selected');
                });
                radio.checked = true;
                label.classList.add('selected');
            });
        });
    },

    renderOption: function (partId, qIdx, value, label, iconClass, iconColor) {
        return `
            <label class="answer-option" data-name="${partId}${qIdx}" data-value="${value}">
                <input type="radio" name="${partId}${qIdx}" value="${value}">
                <div class="answer-card">
                    <div class="radio-dot">
                        <div class="radio-dot-inner"></div>
                    </div>
                    <span class="answer-label flex-1">${label}</span>
                    <i class="fas ${iconClass}" style="color:${iconColor};font-size:1.1rem;opacity:0.8;"></i>
                </div>
            </label>
        `;
    },

    /* =========================================================
       CATEGORY ICONS
    ========================================================= */
    getCategoryIcon: function (category) {
        const icons = {
            'A': 'fa-book-open',
            'B': 'fa-pen-fancy',
            'C': 'fa-calculator',
            'D': 'fa-comments',
            'E': 'fa-hand-paper',
            'F': 'fa-heart-pulse',
            'G': 'fa-bolt',
            'H': 'fa-rotate',
            'I': 'fa-users',
            'J': 'fa-wave-square'
        };
        return icons[category.toUpperCase()] || 'fa-question';
    },

    /* =========================================================
       RESTORE ANSWERS (after JS-based selection)
    ========================================================= */
    restoreAnswersUI: function () {
        const container = document.getElementById('questions-container');
        if (!container) return;
        container.querySelectorAll('.answer-option').forEach(label => {
            const radio = label.querySelector('input[type="radio"]');
            if (radio && radio.checked) {
                label.classList.add('selected');
            }
        });
    },

    /* =========================================================
       OVERALL STATS
    ========================================================= */
    populateOverallStats: function (scores) {
        const values = Object.values(scores);
        const avgScore = values.reduce((a, b) => a + b, 0) / values.length;
        const overallSeverity = Logic.getSeverity(avgScore);

        // Animated counter
        const scoreEl = document.getElementById('overall-score');
        const target = Math.round(avgScore * 100);
        let current = 0;
        const step = Math.max(1, target / 60);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { scoreEl.textContent = target; clearInterval(timer); }
            else { scoreEl.textContent = Math.round(current); }
        }, 16);

        // Severity badge
        const severityEl = document.getElementById('overall-severity');
        const cfg = {
            'Low':      { cls: 'badge badge-green',  icon: 'fa-check-circle' },
            'Moderate': { cls: 'badge badge-amber',  icon: 'fa-exclamation-triangle' },
            'High':     { cls: 'badge badge-red',    icon: 'fa-exclamation-circle' },
        };
        severityEl.className = cfg[overallSeverity].cls;
        severityEl.innerHTML = `<i class="fas ${cfg[overallSeverity].icon}"></i> ${overallSeverity} Risk`;

        // Domain severity counts
        let highCount = 0, moderateCount = 0, lowCount = 0;
        QUESTION_DATA.forEach(part => {
            const s = Logic.getSeverity(scores[part.id]);
            if (s === 'High') highCount++;
            else if (s === 'Moderate') moderateCount++;
            else lowCount++;
        });
        const highEl = document.getElementById('high-count');
        const modEl  = document.getElementById('moderate-count');
        const lowEl  = document.getElementById('low-count');
        if (highEl) highEl.textContent = highCount;
        if (modEl)  modEl.textContent  = moderateCount;
        if (lowEl)  lowEl.textContent  = lowCount;
    },

    /* =========================================================
       CATEGORY CARDS
    ========================================================= */
    renderCategoryCards: function (scores) {
        const container = document.getElementById('category-cards');
        if (!container) return;
        container.innerHTML = '';

        QUESTION_DATA.forEach(part => {
            const score    = Math.round(scores[part.id] * 100);
            const severity = Logic.getSeverity(scores[part.id]);
            const icon     = this.getCategoryIcon(part.id);

            const cfg = {
                'Low':      { border:'rgba(34,197,94,0.2)', bg:'rgba(34,197,94,0.05)', color:'#16a34a' },
                'Moderate': { border:'rgba(245,158,11,0.2)', bg:'rgba(245,158,11,0.05)', color:'#d97706' },
                'High':     { border:'rgba(239,68,68,0.2)', bg:'rgba(239,68,68,0.05)', color:'#dc2626' },
            };
            const c = cfg[severity];

            container.insertAdjacentHTML('beforeend', `
                <div class="rounded-xl p-4 transition-all hover:scale-105"
                    style="border:1px solid ${c.border};background:${c.bg};backdrop-filter:blur(8px);">
                    <div class="flex items-center justify-between mb-2">
                        <div class="icon-circle w-8 h-8" style="background:#ffffff;border:1px solid ${c.border};">
                            <i class="fas ${icon} text-xs" style="color:${c.color};"></i>
                        </div>
                        <span class="text-xl font-display font-bold" style="color:${c.color};">${score}%</span>
                    </div>
                    <h4 class="font-bold text-xs mb-0.5 leading-tight" style="color:#171717;">${part.category}</h4>
                    <p class="text-xs leading-snug" style="color:#737373;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${part.title}</p>
                </div>
            `);
        });
    },

    /* =========================================================
       RADAR CHART
    ========================================================= */
    renderRadarChart: function (scores) {
        const ctx = document.getElementById('radar-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: QUESTION_DATA.map(p => p.category),
                datasets: [{
                    label: 'Risk Level (%)',
                    data: QUESTION_DATA.map(p => scores[p.id] * 100),
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: 'rgba(16, 185, 129, 0.8)',
                    borderWidth: 2,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#059669',
                    pointRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            color: '#737373',
                            backdropColor: 'transparent',
                            font: { family: 'Outfit', size: 10 }
                        },
                        grid:        { color: 'rgba(0,0,0,0.06)' },
                        angleLines:  { color: 'rgba(0,0,0,0.06)' },
                        pointLabels: {
                            color: '#404040',
                            font: { family: 'Outfit', size: 11, weight: '600' }
                        }
                    }
                }
            }
        });
    },

    /* =========================================================
       DONUT CHART
    ========================================================= */
    renderDonutChart: function (scores) {
        const ctx = document.getElementById('donut-chart').getContext('2d');
        let high = 0, mod = 0, low = 0;
        QUESTION_DATA.forEach(part => {
            const s = Logic.getSeverity(scores[part.id]);
            if (s === 'High') high++;
            else if (s === 'Moderate') mod++;
            else low++;
        });

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Low Risk', 'Moderate Risk', 'High Risk'],
                datasets: [{
                    data: [low, mod, high],
                    backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#404040',
                            padding: 12,
                            boxWidth: 10,
                            boxHeight: 10,
                            font: { family: 'Outfit', size: 11 }
                        }
                    }
                }
            }
        });
    },

    /* =========================================================
       STRENGTHS & CONCERNS
    ========================================================= */
    renderStrengthsAndConcerns: function (scores) {
        const strengthsList = document.getElementById('strengths-list');
        const concernsList  = document.getElementById('concerns-list');
        const strengths = [], concerns = [];

        QUESTION_DATA.forEach(part => {
            const severity = Logic.getSeverity(scores[part.id]);
            const score    = Math.round(scores[part.id] * 100);
            if (severity === 'Low') {
                strengths.push({ category: part.category, score });
            } else {
                concerns.push({ category: part.category, score, severity });
            }
        });

        if (strengths.length === 0) {
            strengthsList.innerHTML = '<p class="text-xs" style="color:#737373;">No low-risk areas identified.</p>';
        } else {
            strengthsList.innerHTML = strengths.map(s => `
                <div class="category-pill">
                    <i class="fas fa-check text-xs" style="color:#16a34a;flex-shrink:0;"></i>
                    <span class="text-xs font-semibold flex-1" style="color:#404040;">${s.category}</span>
                    <span class="text-xs font-bold" style="color:#16a34a;">${s.score}%</span>
                </div>
            `).join('');
        }

        if (concerns.length === 0) {
            concernsList.innerHTML = '<p class="text-xs" style="color:#737373;">No significant concerns identified.</p>';
        } else {
            concernsList.innerHTML = concerns.map(c => {
                const color = c.severity === 'High' ? '#dc2626' : '#d97706';
                const icon  = c.severity === 'High' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle';
                return `
                    <div class="category-pill">
                        <i class="fas ${icon} text-xs" style="color:${color};flex-shrink:0;"></i>
                        <span class="text-xs font-semibold flex-1" style="color:#404040;">${c.category}</span>
                        <span class="text-xs font-bold" style="color:${color};">${c.score}%</span>
                    </div>
                `;
            }).join('');
        }
    },

    /* =========================================================
       RECOMMENDATIONS
    ========================================================= */
    renderRecommendations: function (recommendations) {
        const container = document.getElementById('recommendations-list');

        if (recommendations.length === 0) {
            container.innerHTML = `
                <div class="rounded-xl p-5 col-span-2 flex items-center gap-4"
                    style="border:1px solid rgba(34,197,94,0.2);background:rgba(34,197,94,0.05);backdrop-filter:blur(8px);">
                    <div class="icon-circle w-11 h-11 flex-shrink-0" style="background:rgba(34,197,94,0.1);">
                        <i class="fas fa-check-circle" style="color:#16a34a;"></i>
                    </div>
                    <div>
                        <h4 class="font-bold mb-0.5" style="color:#16a34a;">Excellent Performance</h4>
                        <p class="text-sm" style="color:#065f46;">No significant concerns identified. Maintain a supportive learning environment.</p>
                    </div>
                </div>
            `;
            return;
        }

        recommendations.forEach((rec, i) => {
            const isHigh  = rec.severity === 'High';
            const border  = isHigh ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)';
            const bg      = isHigh ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)';
            const iconBg  = isHigh ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)';
            const clr     = isHigh ? '#dc2626' : '#d97706';
            const icon    = isHigh ? 'fa-exclamation-circle' : 'fa-exclamation-triangle';
            const badgeCls= isHigh ? 'badge badge-red' : 'badge badge-amber';

            container.insertAdjacentHTML('beforeend', `
                <div class="rounded-xl p-5 transition-all hover:shadow-md"
                    style="border:1px solid ${border};background:${bg};backdrop-filter:blur(8px);">
                    <div class="flex items-start gap-3 mb-3">
                        <div class="icon-circle w-9 h-9 flex-shrink-0" style="background:${iconBg};">
                            <i class="fas ${icon} text-sm" style="color:${clr};"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2 flex-wrap mb-1">
                                <h4 class="font-display font-bold text-sm" style="color:${clr};">${i + 1}. ${rec.category}</h4>
                                <span class="${badgeCls}">${rec.severity} Risk</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm leading-relaxed" style="color:#404040;">${rec.text}</p>
                </div>
            `);
        });
    }
};
