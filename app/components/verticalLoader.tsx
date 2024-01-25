import { Progress } from '@/components/ui/progress';
import React, { useState, useEffect } from 'react';

interface LoadingIndicatorProps {
  duration: number;
  colors: string[];
}

const LoadingIndicator = ({  duration, colors }: LoadingIndicatorProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  const gradientColors = colors.join(',');

  return (
    <div className="">
      <Progress
        value={progress}
         className='w-full h-1 rounded-full'
      />
      {/* show progress */}
      {/* <div className="w-full h- rounded-full flex items-center justify-center">
        <div className="text-4xl font-bold text-pink-950">{progress}%</div>
        </div> */}
    </div>
  );
};

const Load = () => {
  const randomColor = () => {
    const colors = [
      '#f44336',
      '#9c27b0',
      '#2196f3',
      '#4caf50',
      '#ffeb3b',
      '#ff9800',
      '#795548',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setColors([
        randomColor(),
        randomColor(),
        randomColor(),
        randomColor(),
        randomColor(),
        randomColor(),
        randomColor(),
      ]);
    }, 70);
    return () => clearInterval(interval);
  }
    , []);
  const [colors, setColors] = useState([
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
  ]);
  const duration = 130;


   
  return (
    <div className="">
      <LoadingIndicator duration={duration} colors={colors} />
    </div>
  );
};

export default Load;
