import React from 'react';
import { useDrag } from 'react-dnd';

const PlayerCircle = ({ color, left, top }) => {
  // Define a color map
  const colorMap = {
    red: '#b22222',    // Hex code for red color
    yellow: '#FF9a00', // Hex code for yellow color
  };

  // Get the color from the map, default to red if color is not in the map
  const backgroundColor = colorMap[color] || colorMap.red;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'player',
    item: {color, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        width: '22px',
        height: '22px',
        backgroundColor: backgroundColor, // Use mapped color
        borderRadius: '50%',
        opacity: isDragging ? 0.5 : 1,
        position: 'absolute',
        left: left, // Use initialLeft for positioning
        top: top,
      }}
    />
  );
};

export default PlayerCircle;
