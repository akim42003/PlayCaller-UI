import React, { useState } from 'react';
import PlayerCircle from './PlayerCircle';
import BasketballCourt from './BasketballCourt';
import html2canvas from 'html2canvas'

const CourtLayout = () => {
    const [redCirclesCount, setRedCirclesCount] = useState(5);
    const [yellowCirclesCount, setYellowCirclesCount] = useState(5);
    const [analysisResult, setAnalysisResult] = useState('');

    const resetCircles = () => {
        setRedCirclesCount(5);
        setYellowCirclesCount(5);
    }

    const getImageBlob = () => {
      return new Promise((resolve, reject) => {
          const courtElement = document.getElementById('basketballCourt'); // ID of the BasketballCourt div
  
              html2canvas(courtElement).then(canvas => {
                  canvas.toBlob(blob => resolve(blob), 'image/jpeg');
              }).catch(error => {
                  reject(new Error("Failed to capture the court image"));
              });
          });
      };

    const analyzePlay = async () => {
        try {
            const imageBlob = await getImageBlob();
            const formData = new FormData();
            formData.append('file', imageBlob, 'image.jpg');
            formData.append('route', 'playcaller');
    
            const response = await fetch('http://127.0.0.1:5000/process-image', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log('Success:', data);
    
            if (data.play_classification) {
                const { Offense, Defense } = data.play_classification;
                setAnalysisResult(`Offense: ${Offense}% \nDefense: ${Defense}%`);
            } else {
                console.error('Unexpected data structure:', data);
                alert('Unexpected data structure received from server.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`An error occurred while processing the image.`);
        }
    };
    

    const addHoverEffect = (e) => {
        e.target.style.backgroundColor = '#6B6B99'; // Darker green on hover
    };

    const removeHoverEffect = (e) => {
        e.target.style.backgroundColor = '#6B5B95'; // Original green when not hovered
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Existing layout code */}
            <div style={{ marginRight: '20px' }}>
              <h2>Team 1</h2>
              {[...Array(redCirclesCount)].map((_, i) => (
                <PlayerCircle
                  key={`Team 1-${i}`}
                  color="red"
                  type="player"
                />
              ))}
              <br />
              <h2>Team 2</h2>
              {[...Array(yellowCirclesCount)].map((_, i) => (
                <PlayerCircle
                  key={`Team 2-${i}`}
                  color="yellow"
                  type="player"
                />
              ))}
            </div>
            <div style={{ position: 'relative' }}>
                <BasketballCourt id="basketballCourtImage" setRedCirclesCount={setRedCirclesCount} setYellowCirclesCount={setYellowCirclesCount} resetCircles={resetCircles} />
                <button 
                    onClick={analyzePlay} 
                    style={analyzeButtonStyle}
                    onMouseEnter={addHoverEffect}
                    onMouseLeave={removeHoverEffect}
                >
                    Analyze Play
                </button>
                <div style={analysisResultStyle}>
                    {analysisResult}
                </div>
            </div>
        </div>
    );
};



const analyzeButtonStyle = {
position: 'absolute',
top: '50%', // Positioned at the bottom
right: '-200px',
transform: 'translateY(-50%)', // Adjust vertical centering
backgroundColor: '#6B5B95',
color: 'white', // White text
padding: '10px 20px', // Padding around the text
border: 'none', // No border
borderRadius: '5px', // Rounded corners
cursor: 'pointer', // Cursor pointer on hover
outline: 'none', // No outline
boxShadow: '0 4px #999', // Box shadow for 3D effect
fontFamily: 'Roboto, sans-serif', // Apply Roboto font
fontWeight: '700', // Bold font weight
// Add more styles as needed (background, color, etc.)
};

const analysisResultStyle = {
marginTop: '5px',
padding: '15px',
border: '1px solid #ddd',
borderRadius: '4px',
backgroundColor: '#FF6F61',
color: 'white',
fontFamily: 'Georgia, sans-serif', // Apply Roboto font
fontWeight: '700',
};

export default CourtLayout;
