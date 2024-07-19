// Example of a custom PDFViewer component
import { Document, Page } from 'react-pdf';

const PDFViewer = ({ file }) => {
    return (
        <Document file={file}>
            <Page pageNumber={1} />
        </Document>
    );
};

export default PDFViewer;
