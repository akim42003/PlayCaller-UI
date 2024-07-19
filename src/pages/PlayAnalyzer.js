import React, { useState } from "react";

const PlayAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setAnalysisResult(''); // Reset analysis result when a new file is selected
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile);  // Append the file to the form data
        formData.append('route', 'player_detection');
    
        // Use fetch to send the file to your Flask server
        fetch('http://127.0.0.1:5000/process-image', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Update the analysis result with data from the server
            setAnalysisResult(`Offense: ${data.play_classification.Offense}% \nDefense: ${data.play_classification.Defense}%`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`An error occurred while processing ${selectedFile.name}`);
        });
    };

    return (
        <div>
            <div className="file-upload-container">
                <label htmlFor="file-upload" className="upload-label">Choose Image</label>
                <input id="file-upload" type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleFileChange} className="custom-file-input" />
                <button onClick={handleUpload} className="upload-button">Upload and Analyze Image</button>
            </div>
            
            {analysisResult && <div className="analysis-result">{analysisResult}</div>}
        </div>
    );
};

 
export default PlayAnalyzer;
