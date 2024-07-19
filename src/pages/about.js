import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set up pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const About = () => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            {/* PDF Viewer */}
            <div className="pdf-viewer" style={{ width: '1200px', height: '800px', overflow: 'scroll' }}>
                <Document
                    file="/write_up.pdf" // Ensure this path is correct
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => 
                        (<Page key={`page_${index + 1}`} pageNumber={index + 1} scale={2.0} />))}
                </Document>
            </div>
        </div>
    );
};

export default About;
