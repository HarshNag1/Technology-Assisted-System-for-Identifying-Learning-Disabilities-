const Logic = {
    // Thresholds for severity levels
    THRESHOLDS: {
        HIGH: 0.7,    // >= 70%
        MODERATE: 0.4 // >= 40%
    },

    // Calculate scores for all categories
    calculateScores: function (responses) {
        const scores = {};

        QUESTION_DATA.forEach(part => {
            let partScore = 0;
            let maxPartScore = part.questions.length * 3; // Max score per question is 3 (Always)

            // Sum up scores for this part
            part.questions.forEach((_, index) => {
                const questionId = `${part.id}${index}`;
                if (responses[questionId] !== undefined) {
                    partScore += parseInt(responses[questionId]);
                }
            });

            // Normalize to 0-1 range
            scores[part.id] = maxPartScore > 0 ? partScore / maxPartScore : 0;
        });

        return scores;
    },

    // Get severity level based on score
    getSeverity: function (score) {
        if (score >= this.THRESHOLDS.HIGH) return 'High';
        if (score >= this.THRESHOLDS.MODERATE) return 'Moderate';
        return 'Low';
    },

    // Get recommendations based on results
    getRecommendations: function (scores) {
        const recommendations = [];

        QUESTION_DATA.forEach(part => {
            const score = scores[part.id];
            const severity = this.getSeverity(score);

            if (severity !== 'Low') {
                recommendations.push({
                    category: part.category,
                    severity: severity,
                    text: this.getRecommendationText(part.id, severity)
                });
            }
        });

        return recommendations;
    },

    // Helper to get specific recommendation text
    getRecommendationText: function (partId, severity) {
        const baseText = severity === 'High'
            ? "Significant difficulties observed. Professional evaluation recommended."
            : "Some difficulties observed. Monitoring and support suggested.";

        const specificTexts = {
            'a': "Consider structured literacy programs and reading support.",
            'b': "Occupational therapy for fine motor skills may be beneficial.",
            'c': "Use manipulatives and visual aids for mathematical concepts.",
            'd': "Speech-language pathology assessment is advised.",
            'e': "Activities to improve gross and fine motor coordination recommended.",
            'f': "Counseling or relaxation techniques may help manage anxiety.",
            'g': "Strategies for attention management and classroom accommodations recommended.",
            'h': "Cognitive behavioral strategies may be helpful.",
            'i': "Social skills training and group activities suggested.",
            'j': "Consultation with a neurologist or specialist may be warranted."
        };

        return `${baseText} ${specificTexts[partId] || ''}`;
    }
};
