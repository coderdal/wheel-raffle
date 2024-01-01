"use client";
import { useEffect, useRef, useState } from "react";
import "./Wheel.scss";
import { getRandomNumber } from "@/helpers/helpers";

interface WheelItem {
  title: string;
  bg_color: string;
}

const initialItems: WheelItem[] = [
  { title: 'Ödül 11111111111gg11111', bg_color: '#FF5733' },
  { title: 'Ödül 2', bg_color: '#33FF57' },
  { title: 'Ödül 3', bg_color: '#5733FF' },
  { title: 'Ödül 4', bg_color: '#33FFFF' },
  { title: 'Ödül 5', bg_color: '#30877e' },
  { title: 'Ödül 6', bg_color: '#1ec36e' },
  { title: 'Ödül 7', bg_color: '#e552ca' }
];

const Wheel = () => {
  const [wheelItems, setWheelItems] = useState<WheelItem[]>(initialItems);
  const wheelCanvas = useRef<HTMLCanvasElement>(null);
  const spinResultAngle = useRef<number>(0);

  // Constants
  const ANIMATION_DURATION = 10000 // ms

  const drawWheel = () => {
    const { current: canvas } = wheelCanvas;
    if (canvas === null) return;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate wheel properties
    const numSlices = wheelItems.length; // Wheel slice count
    const sliceAngle = (Math.PI * 2) / numSlices; // Slice angle
    const wheelRadius = Math.min(canvas.width, canvas.height) / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw wheel slices
    for (let i = 0; i < numSlices; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      const sliceMiddleAngle = startAngle + (sliceAngle / 2); // compute middle angle of the slice (to display title)
      let displayText = wheelItems[i].title
      if (displayText.length > 18) {
        displayText = displayText.slice(0, 18).concat('...');
      }
  
      // Draw the slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY); // Go to the center of canvas
      ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
      ctx.fillStyle = wheelItems[i].bg_color; // Fill slice with its own bg color
      ctx.fill();
      ctx.closePath();
      ctx.save();

      // Draw the text on slice
      ctx.translate(centerX, centerY); // Go to the center of canvas
      ctx.rotate(sliceMiddleAngle); // Rotate the canvas to middle of the slice
      // Text styles
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.shadowColor = "#1d1d1d";
      ctx.shadowBlur = 10;
      ctx.fillText(displayText, wheelRadius / 3, 6); // Draw the title
      ctx.restore();
    }
  };

  const spinWheel = () => {
    if (!wheelCanvas.current) return;
    spinResultAngle.current = getRandomNumber(0,365);

    wheelCanvas.current.animate(
      {
        transform: ['rotate(-2500deg)', `rotate(${spinResultAngle.current}deg)`],
      }, 
      {
        duration: ANIMATION_DURATION,
        easing: 'cubic-bezier(0.0002, 0.0001, 0.001, 0.9999)',
        fill: 'forwards'
      }
    );

    // On animation ends
    setTimeout(() => {
      displayResult();
    }, ANIMATION_DURATION);
  };

  const displayResult = () => {
    console.log('result is');
  }

  useEffect(() => {
    drawWheel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wheelItems]);

  return (
    <section className='wheel-container'>
      <button className='spin-btn' onClick={spinWheel}>Spin</button>
      <canvas ref={wheelCanvas} width="500px" height="500px"></canvas>
    </section>
  );
};

export default Wheel;
