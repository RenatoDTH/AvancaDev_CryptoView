import React from 'react';
import './index.css';

interface LegedProps {
  legend: string;
}

const Legend: React.FC<LegedProps> = ({ legend }) => {
  return <div className="Legend">{legend}</div>;
};

export default Legend;
