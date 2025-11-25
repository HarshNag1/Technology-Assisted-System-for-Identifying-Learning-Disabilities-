// PDF Export functionality
class PDFExporter {
    constructor() {
        this.doc = null;
        this.margins = {
            top: 40,
            left: 40,
            right: 40,
            bottom: 40
        };
        this.currentY = 0;
    }

    // Initialize a new PDF document
    init() {
        // We'll use jsPDF for PDF generation
        if (typeof jsPDF === 'undefined') {
            console.error('jsPDF library not loaded');
            return false;
        }

        this.doc = new jsPDF();
        this.currentY = this.margins.top;
        return true;
    }

    // Add a title to the PDF
    addTitle(text) {
        if (!this.doc) return;
        
        this.doc.setFontSize(18);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(text, this.margins.left, this.currentY);
        this.currentY += 15;
        this.addSpacing(10);
    }

    // Add a section header
    addSectionHeader(text) {
        if (!this.doc) return;
        
        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(text, this.margins.left, this.currentY);
        this.currentY += 10;
    }

    // Add a paragraph of text
    addParagraph(text, options = {}) {
        if (!this.doc) return;
        
        const { fontSize = 11, fontStyle = 'normal', align = 'left' } = options;
        
        this.doc.setFontSize(fontSize);
        this.doc.setFont('helvetica', fontStyle);
        
        const maxWidth = this.doc.internal.pageSize.width - this.margins.left - this.margins.right;
        const lines = this.doc.splitTextToSize(text, maxWidth);
        
        lines.forEach(line => {
            if (this.currentY > this.doc.internal.pageSize.height - this.margins.bottom) {
                this.doc.addPage();
                this.currentY = this.margins.top;
            }
            
            this.doc.text(line, this.margins.left, this.currentY, { align });
            this.currentY += 7;
        });
        
        this.addSpacing(5);
    }

    // Add a list of items
    addList(items, options = {}) {
        if (!this.doc) return;
        
        const { bullet = '•', fontSize = 11 } = options;
        this.doc.setFontSize(fontSize);
        
        items.forEach(item => {
            if (this.currentY > this.doc.internal.pageSize.height - this.margins.bottom - 10) {
                this.doc.addPage();
                this.currentY = this.margins.top;
            }
            
            const bulletX = this.margins.left;
            const textX = this.margins.left + 5;
            const maxWidth = this.doc.internal.pageSize.width - this.margins.left - this.margins.right - 10;
            
            this.doc.setFont('helvetica', 'normal');
            this.doc.text(bullet, bulletX, this.currentY + 4);
            
            const lines = this.doc.splitTextToSize(item, maxWidth);
            this.doc.text(lines, textX, this.currentY + 4, { align: 'left' });
            
            this.currentY += lines.length * 7;
        });
        
        this.addSpacing(5);
    }

    // Add a horizontal line
    addHorizontalLine() {
        if (!this.doc) return;
        
        const pageWidth = this.doc.internal.pageSize.width;
        this.doc.setDrawColor(200);
        this.doc.setLineWidth(0.5);
        this.doc.line(this.margins.left, this.currentY, pageWidth - this.margins.right, this.currentY);
        this.currentY += 10;
    }

    // Add spacing
    addSpacing(points) {
        if (!this.doc) return;
        this.currentY += points;
    }

    // Add a page break
    addPageBreak() {
        if (!this.doc) return;
        this.doc.addPage();
        this.currentY = this.margins.top;
    }

    // Generate and download the PDF
    download(filename = 'sld-assessment-report.pdf') {
        if (!this.doc) return;
        this.doc.save(filename);
    }

    // Generate assessment report
    generateAssessmentReport(data) {
        if (!this.init()) return null;
        
        // Add header
        this.addTitle('SLD Assessment Report');
        this.doc.setTextColor(100);
        this.doc.setFontSize(11);
        this.doc.text(`Generated on: ${new Date().toLocaleDateString()}`, this.margins.left, this.currentY);
        this.addSpacing(15);
        
        // Add summary section
        this.addSectionHeader('Assessment Summary');
        this.addParagraph('This report summarizes the results of the Specific Learning Disabilities (SLD) screening assessment. The assessment evaluates various areas of learning and development to identify potential difficulties that may require further investigation or support.');
        
        // Add scores summary
        if (data.scores) {
            this.addSectionHeader('Scores by Category');
            
            // Create a table of scores
            const tableColumn = ["Category", "Score", "Level"];
            const tableRows = [];
            
            for (const [part, score] of Object.entries(data.scores)) {
                const level = SCORING.getConcernLevel(score);
                const partName = SCORING.getPartName(part) || part;
                const scorePercent = Math.round(score * 100);
                tableRows.push([partName, `${scorePercent}%`, level]);
            }
            
            // Add overall score
            const overallScore = SCORING.calculateOverallScore(data.scores);
            const overallLevel = SCORING.getConcernLevel(overallScore);
            tableRows.push([{content: 'Overall Score', styles: {fontStyle: 'bold'}}, 
                          {content: `${Math.round(overallScore * 100)}%`, styles: {fontStyle: 'bold'}}, 
                          {content: overallLevel, styles: {fontStyle: 'bold'}}]);
            
            // Add the table to the PDF
            this.doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: this.currentY,
                theme: 'grid',
                headStyles: { fillColor: [79, 70, 229] }, // Primary color
                margin: { top: 10, right: this.margins.right, bottom: 10, left: this.margins.left },
                didDrawPage: (data) => {
                    this.currentY = data.cursor.y + 10;
                }
            });
            
            this.addSpacing(10);
        }
        
        // Add recommendations
        if (data.recommendations && data.recommendations.length > 0) {
            this.addPageBreak();
            this.addSectionHeader('Recommendations');
            
            data.recommendations.forEach((rec, index) => {
                if (index > 0) this.addSpacing(10);
                
                this.doc.setFontSize(12);
                this.doc.setFont('helvetica', 'bold');
                this.doc.text(`${rec.title} (${rec.level})`, this.margins.left, this.currentY);
                this.currentY += 8;
                
                this.doc.setFont('helvetica', 'normal');
                this.doc.setFontSize(11);
                
                rec.suggestions.forEach((suggestion, i) => {
                    if (this.currentY > this.doc.internal.pageSize.height - this.margins.bottom - 10) {
                        this.addPageBreak();
                    }
                    
                    const bulletX = this.margins.left;
                    const textX = this.margins.left + 5;
                    const maxWidth = this.doc.internal.pageSize.width - this.margins.left - this.margins.right - 10;
                    
                    this.doc.text('•', bulletX, this.currentY + 4);
                    
                    const lines = this.doc.splitTextToSize(suggestion, maxWidth);
                    this.doc.text(lines, textX, this.currentY + 4);
                    
                    this.currentY += lines.length * 6;
                });
                
                this.currentY += 5;
            });
        }
        
        // Add footer
        this.addPageBreak();
        this.doc.setFontSize(10);
        this.doc.setTextColor(100);
        this.doc.text('Confidential - For assessment purposes only', this.margins.left, this.currentY);
        this.doc.text('Page ' + this.doc.internal.getNumberOfPages(), 
                     this.doc.internal.pageSize.width - this.margins.right - 20, 
                     this.currentY, { align: 'right' });
        
        return this.doc;
    }
}

// Export functionality to be called from the results page
function exportToPDF(data, filename = 'sld-assessment-report.pdf') {
    const exporter = new PDFExporter();
    exporter.generateAssessmentReport(data);
    exporter.download(filename);
}

// Initialize PDF export when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the download button
    const downloadBtn = document.getElementById('download-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Get the assessment data from the page
            const responses = []; // Get responses from form or storage
            const scores = {}; // Calculate scores
            const recommendations = []; // Generate recommendations
            
            const data = {
                scores,
                recommendations,
                responses,
                date: new Date().toISOString(),
                // Add any additional data needed for the report
            };
            
            exportToPDF(data);
        });
    }
});
