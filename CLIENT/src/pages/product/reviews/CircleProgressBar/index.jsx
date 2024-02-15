import { useEffect, useState } from 'react';
import styles from "./circularProgressBar.module.scss"


const CircularProgressBar = ({ radius, progress, strokeWidth,average }) => {
    const [circumference, setCircumference] = useState(0);
  
    useEffect(() => {
      const circleLength = 2 * Math.PI * radius;
      setCircumference(circleLength);
    }, [radius]);
  
    const calculateProgress = (progress) => {
      if (progress < 0) return 0;
      if (progress > 100) return 100;
      return progress;
    };
  
    const normalizedProgress = calculateProgress(progress);
    const strokeDashoffset = circumference - (circumference * normalizedProgress) / 100;
  
    return (
      <div className={styles.circularProgressBar}>
        <p className={styles.rating}>{average}</p>
        <svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgCircle}
        >
          {/* Background Circle */}
          <circle
            stroke="#E4E9EE" // Background color
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            r={radius - strokeWidth / 2}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <circle
            stroke="#FFA439" // Progress color
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            r={radius - strokeWidth / 2}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    );
  };

export default CircularProgressBar