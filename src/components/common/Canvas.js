import React, { useEffect, useRef } from 'react';

const Canvas = ({ name, width, height, fontSize, borderRadius = '15px' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set the canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Set text align and baseline to center
        context.textAlign = 'left';
        context.textBaseline = 'middle';

        // Set the font size and color
        context.font = `${fontSize} sans`;
        context.fillStyle = '#ffffff';

        // Measure the width of the text
        const textWidth = context.measureText(name.charAt(0).toUpperCase()).width;

        // Calculate the coordinates for text placement
        const textX = (canvas.width - textWidth) / 2;
        const textY = (canvas.height / 2);

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the characters onto the canvas
        context.fillText(name.charAt(0).toUpperCase(), textX, textY);
    });

    return (
        <canvas ref={canvasRef} style={{ borderRadius: borderRadius }} className='orange-bg' />
    )
}

export default Canvas