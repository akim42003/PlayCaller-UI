import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import PlayerCircle from './PlayerCircle';
import courtImage from '../assets/court.png';


const BasketballCourt = ({ setRedCirclesCount, setYellowCirclesCount, resetCircles }) => {
  const [players, setPlayers] = useState([]);
  const dropTargetRef = useRef(null); // Create a ref for the drop target

  const [, drop] = useDrop({
    accept: 'player',
    drop: (item, monitor) => {
      if (!dropTargetRef.current) {
        console.log("Drop target ref is not available.");
        return;
      }

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        console.log("Client offset is not available.");
        return;
      }

      const dropTargetRect = dropTargetRef.current.getBoundingClientRect();
      const left = clientOffset.x - dropTargetRect.left;
      const top = clientOffset.y - dropTargetRect.top;

      setPlayers(prevPlayers => [...prevPlayers, { ...item, left, top }]);
      if (item.color === 'red') {
        setRedCirclesCount(prevCount => Math.max(prevCount - 1, 0));
      } else if (item.color === 'yellow') {
        setYellowCirclesCount(prevCount => Math.max(prevCount - 1, 0));
      }
    },
  });

  const handleReset = () => {
    setPlayers([]); // Clear the players on the court
    resetCircles();  // Reset the counts in CourtLayout
  };

  const addHoverEffect = (e) => {
    e.target.style.backgroundColor = '#45a049'; // Darker green on hover
  };
  
  const removeHoverEffect = (e) => {
    e.target.style.backgroundColor = '#4CAF50'; // Original green when not hovered
  };

  drop(dropTargetRef); // Attach the drop functionality to the ref

  return (
    <div
      ref={dropTargetRef} // Use the created ref here
      id="basketballCourt"
      style={{ 
        width: '800px', 
        height: '600px', 
        position: 'relative', 
        backgroundImage: `url(${courtImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {players.map((player, index) => (
        <PlayerCircle
          key={index}
          color={player.color}
          left={player.left}
          top={player.top}
        />
      ))}
      <button 
        onClick={handleReset} 
        style={resetButtonStyle}
        onMouseEnter={addHoverEffect}
        onMouseLeave={removeHoverEffect}
      >
        Reset Court
      </button>
    </div>
  );
};

const resetButtonStyle = {
  backgroundColor: '#4CAF50', // Green background
  color: 'white', // White text
  padding: '10px 20px', // Padding around the text
  border: 'none', // No border
  borderRadius: '5px', // Rounded corners
  cursor: 'pointer', // Cursor pointer on hover
  outline: 'none', // No outline
  boxShadow: '0 4px #999', // Box shadow for 3D effect
  position: 'absolute', // Absolute position
  bottom: '20px', // Positioned at the bottom
  right: '20px', // Positioned to the right
  fontFamily: 'Roboto, sans-serif', // Apply Roboto font
  fontWeight: '700', // Bold font weight
};


export default BasketballCourt;
