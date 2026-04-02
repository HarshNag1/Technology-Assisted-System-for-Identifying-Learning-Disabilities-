const PDFExport = {
    generate: function (profile, scores, recommendations) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header with gradient effect (Indigo)
        doc.setFillColor(99, 102, 241); // Indigo 500
        doc.rect(0, 0, 210, 45, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text("SLD SCREENING REPORT", 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("Comprehensive Learning Disability Assessment", 105, 30, { align: 'center' });
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 38, { align: 'center' });

        // Student Profile Section
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text("Student Profile", 20, 60);

        // Add Photo if available
        let profileEndY = 60;
        if (profile.photo) {
            try {
                // Add photo on the right side
                const imgWidth = 35;
                const imgHeight = 35;
                doc.addImage(profile.photo, 'JPEG', 160, 55, imgWidth, imgHeight);

                // Add border around photo
                doc.setDrawColor(99, 102, 241); // Indigo
                doc.setLineWidth(0.5);
                doc.rect(160, 55, imgWidth, imgHeight);
            } catch (e) {
                console.error("Error adding photo to PDF:", e);
            }
        }

        // Profile Details
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text(`Name: ${profile.name}`, 20, 70);
        doc.text(`Age: ${profile.age} years`, 20, 77);
        doc.text(`Grade: ${profile.grade}`, 20, 84);
        doc.text(`Gender: ${profile.gender}`, 20, 91);

        // Assessment Summary Box
        doc.setDrawColor(99, 102, 241);
        doc.setLineWidth(0.5);
        doc.rect(20, 100, 170, 20);
        doc.setFillColor(243, 244, 246); // Cool Grey 100
        doc.rect(20, 100, 170, 20, 'F');

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text("Assessment Duration: 10-15 minutes", 25, 107);
        doc.setFont(undefined, 'normal');
        doc.text("Categories Evaluated: 10 | Total Questions: " + QUESTION_DATA.reduce((sum, part) => sum + part.questions.length, 0), 25, 114);

        // Detailed Scores Table
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text("Detailed Assessment Results", 20, 135);

        const tableData = QUESTION_DATA.map(part => [
            part.category,
            part.title,
            `${Math.round(scores[part.id] * 100)}%`,
            Logic.getSeverity(scores[part.id])
        ]);

        doc.autoTable({
            startY: 142,
            head: [['Category', 'Area', 'Score', 'Severity']],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [99, 102, 241],
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 9
            },
            columnStyles: {
                0: { cellWidth: 25 },
                1: { cellWidth: 85 },
                2: { cellWidth: 25 },
                3: { cellWidth: 30 }
            },
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index === 3) {
                    const severity = data.cell.raw;
                    if (severity === 'High') {
                        data.cell.styles.textColor = [220, 38, 38]; // Red
                        data.cell.styles.fontStyle = 'bold';
                    } else if (severity === 'Moderate') {
                        data.cell.styles.textColor = [234, 179, 8]; // Yellow
                        data.cell.styles.fontStyle = 'bold';
                    } else {
                        doc.setTextColor(16, 185, 129); // Green (Keep green for low risk as "Safe")
                        // Alternatively use Indigo: doc.setTextColor(99, 102, 241);
                        data.cell.styles.textColor = [99, 102, 241];
                    }
                }
            }
        });

        // Overall Performance Summary
        let yPos = doc.lastAutoTable.finalY + 15;

        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text("Overall Performance Summary", 20, yPos);
        yPos += 10;

        const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
        const overallSeverity = Logic.getSeverity(avgScore);

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text(`Average Score: ${Math.round(avgScore * 100)}%`, 20, yPos);
        yPos += 7;
        doc.text(`Overall Assessment: ${overallSeverity}`, 20, yPos);
        yPos += 7;

        const highConcerns = QUESTION_DATA.filter(part => Logic.getSeverity(scores[part.id]) === 'High').length;
        const moderateConcerns = QUESTION_DATA.filter(part => Logic.getSeverity(scores[part.id]) === 'Moderate').length;

        doc.text(`Areas of High Concern: ${highConcerns}`, 20, yPos);
        yPos += 7;
        doc.text(`Areas of Moderate Concern: ${moderateConcerns}`, 20, yPos);
        yPos += 15;

        // Detailed Recommendations
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text("Detailed Recommendations", 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');

        if (recommendations.length === 0) {
            doc.text("No significant concerns identified. Continue regular monitoring.", 20, yPos);
        } else {
            recommendations.forEach((rec, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }

                // Category header with colored box
                doc.setFillColor(243, 244, 246); // Cool Grey
                doc.rect(20, yPos - 5, 170, 8, 'F');

                doc.setFont(undefined, 'bold');
                doc.setFontSize(11);
                doc.text(`${index + 1}. ${rec.category} - ${rec.severity} Risk`, 22, yPos);
                yPos += 10;

                // Recommendation text
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);
                const splitText = doc.splitTextToSize(rec.text, 165);
                doc.text(splitText, 25, yPos);
                yPos += splitText.length * 5 + 8;
            });
        }

        // Additional Notes Section
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        } else {
            yPos += 10;
        }

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("Important Notes", 20, yPos);
        yPos += 8;

        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        const notes = [
            "• This screening is not a diagnostic tool and should not replace professional evaluation.",
            "• Results indicate potential areas of concern that may require further assessment.",
            "• Consult with educational psychologists or specialists for comprehensive evaluation.",
            "• Early intervention is key to supporting children with learning difficulties.",
            "• Regular monitoring and follow-up assessments are recommended."
        ];

        notes.forEach(note => {
            const lines = doc.splitTextToSize(note, 165);
            doc.text(lines, 20, yPos);
            yPos += lines.length * 5;
        });

        // Footer on all pages
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.setFont(undefined, 'italic');
            doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
            doc.text("Smart SLD Screening Tool - Confidential Report", 105, 285, { align: 'center' });
        }

        // Save with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        doc.save(`SLD_Report_${profile.name.replace(/\s+/g, '_')}_${timestamp}.pdf`);
    }
};
