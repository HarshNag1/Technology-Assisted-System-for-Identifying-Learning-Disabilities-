// Scoring configuration
const SCORING = {
    // Scoring weights for each part (A-J)
    weights: {
        a: 1, // Reading Difficulties
        b: 1, // Writing Difficulties
        c: 1, // Mathematical Difficulties
        d: 1, // Speech and Language
        e: 1, // Motor Skills
        f: 1, // Anxiety and Emotional
        g: 1, // Attention and Hyperactivity
        h: 1, // Obsessive-Compulsive
        i: 1, // Social Communication
        j: 1  // Tic and Movement
    },
    
    // Thresholds for different levels of concern
    thresholds: {
        low: 0.3,    // 0-30% - Low concern
        medium: 0.6, // 31-60% - Moderate concern
        high: 0.9    // 61-100% - High concern
    },
    
    // Calculate score for a single part
    calculatePartScore: function(partId, responses) {
        const partResponses = responses.filter(r => r.startsWith(partId));
        if (partResponses.length === 0) return 0;
        
        const total = partResponses.reduce((sum, q) => {
            return sum + (parseInt(document.querySelector(`input[name="${q}"]:checked`)?.value) || 0);
        }, 0);
        
        // Normalize to 0-1 range (0-4 scale * 7 questions = max 28)
        return Math.min(total / (4 * 7), 1);
    },
    
    // Calculate overall score
    calculateOverallScore: function(scores) {
        const totalWeight = Object.values(this.weights).reduce((a, b) => a + b, 0);
        let weightedSum = 0;
        
        for (const [part, score] of Object.entries(scores)) {
            weightedSum += score * (this.weights[part] || 0);
        }
        
        return weightedSum / totalWeight;
    },
    
    // Get level of concern based on score
    getConcernLevel: function(score) {
        if (score >= this.thresholds.high) return 'High';
        if (score >= this.thresholds.medium) return 'Moderate';
        if (score >= this.thresholds.low) return 'Mild';
        return 'Minimal or None';
    },
    
    // Get recommendations based on scores
    getRecommendations: function(scores) {
        const recommendations = [];
        
        // General recommendations based on overall score
        const overallScore = this.calculateOverallScore(scores);
        const concernLevel = this.getConcernLevel(overallScore);
        
        recommendations.push({
            title: 'Overall Assessment',
            level: concernLevel,
            suggestions: this.getGeneralRecommendations(concernLevel)
        });
        
        // Specific recommendations for each area of concern
        for (const [part, score] of Object.entries(scores)) {
            if (score > this.thresholds.low) {
                const partName = this.getPartName(part);
                const partLevel = this.getConcernLevel(score);
                
                recommendations.push({
                    title: partName,
                    level: partLevel,
                    suggestions: this.getPartSpecificRecommendations(part, score)
                });
            }
        }
        
        return recommendations;
    },
    
    // Helper methods
    getPartName: function(partId) {
        const partNames = {
            a: 'Reading Difficulties',
            b: 'Writing Difficulties',
            c: 'Mathematical Difficulties',
            d: 'Speech and Language Difficulties',
            e: 'Motor Skills Difficulties',
            f: 'Anxiety and Emotional Difficulties',
            g: 'Attention and Hyperactivity Difficulties',
            h: 'Obsessive-Compulsive Difficulties',
            i: 'Social Communication Difficulties',
            j: 'Tic and Movement Difficulties'
        };
        return partNames[partId] || '';
    },
    
    getGeneralRecommendations: function(level) {
        const recommendations = {
            'High': [
                'Consider consulting with a specialist for a comprehensive evaluation.',
                'Implement recommended interventions and accommodations.',
                'Regular monitoring and follow-up assessments are advised.'
            ],
            'Moderate': [
                'Targeted interventions may be beneficial.',
                'Monitor progress and consider further evaluation if concerns persist.',
                'Implement classroom accommodations as needed.'
            ],
            'Mild': [
                'Monitor for any changes or increased difficulties.',
                'Consider implementing basic support strategies.',
                'Reassess if concerns continue or worsen.'
            ],
            'Minimal or None': [
                'Current screening suggests minimal concerns.',
                'Continue to monitor for any emerging difficulties.'
            ]
        };
        
        return recommendations[level] || [];
    },
    
    getPartSpecificRecommendations: function(partId, score) {
        const level = this.getConcernLevel(score);
        const recommendations = [];
        
        // Add specific recommendations based on the part and level of concern
        switch(partId) {
            case 'a': // Reading
                if (level === 'High') {
                    recommendations.push('Consider comprehensive reading assessment.');
                    recommendations.push('Implement evidence-based reading intervention.');
                }
                break;
            case 'b': // Writing
                if (level === 'High') {
                    recommendations.push('Provide explicit instruction in writing mechanics.');
                    recommendations.push('Consider assistive technology for writing tasks.');
                }
                break;
            // Add more specific recommendations for other parts
        }
        
        return recommendations.length > 0 ? recommendations : ['No specific recommendations available.'];
    },
    
    // Generate PDF report
    generatePDF: function(scores, recommendations) {
        // This function will be implemented in pdf-export.js
        console.log('PDF generation will be handled by pdf-export.js');
        return null;
    }
};

// Results page functionality
const ResultsPage = {
    init: function() {
        this.displayResults();
        this.setupEventListeners();
    },
    
    displayResults: function() {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;
        
        // Get scores from session storage or calculate them
        const responses = this.getResponses();
        const scores = this.calculateScores(responses);
        const recommendations = SCORING.getRecommendations(scores);
        
        // Display results
        resultsContainer.innerHTML = this.generateResultsHTML(scores, recommendations);
    },
    
    getResponses: function() {
        // Get responses from form or session storage
        return []; // Placeholder
    },
    
    calculateScores: function(responses) {
        // Calculate scores for each part
        const scores = {};
        for (const part of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']) {
            scores[part] = SCORING.calculatePartScore(part, responses);
        }
        return scores;
    },
    
    generateResultsHTML: function(scores, recommendations) {
        let html = `
            <div class="results-summary">
                <h2>Assessment Results</h2>
                <div class="score-summary">
                    <h3>Summary of Results</h3>
                    <div class="score-chart">
                        <!-- Score visualization will be added here -->
                    </div>
                </div>
                <div class="recommendations">
                    <h3>Recommendations</h3>
                    <div class="recommendations-list">
        `;
        
        recommendations.forEach(rec => {
            html += `
                <div class="recommendation">
                    <h4>${rec.title} <span class="level ${rec.level.toLowerCase().replace(' ', '-')}">${rec.level}</span></h4>
                    <ul>
                        ${rec.suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
                <div class="actions">
                    <button id="download-pdf" class="btn btn-primary">
                        <i class="fas fa-download"></i> Download PDF Report
                    </button>
                    <button id="start-new" class="btn btn-outline">
                        <i class="fas fa-redo"></i> Start New Assessment
                    </button>
                </div>
            </div>
        `;
        
        return html;
    },
    
    setupEventListeners: function() {
        // PDF download button
        document.getElementById('download-pdf')?.addEventListener('click', () => {
            // This will be implemented in pdf-export.js
            console.log('Download PDF clicked');
        });
        
        // Start new assessment
        document.getElementById('start-new')?.addEventListener('click', () => {
            // Clear form and redirect to start
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
};

// Initialize results page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('results-container')) {
        ResultsPage.init();
    }
});
