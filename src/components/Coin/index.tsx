import React from 'react';
import './index.css';

interface CoinProps {
  coin: string;
  oldPrice: number;
  currentPrice: number;
}

const Coin: React.FC<CoinProps> = ({ coin, oldPrice, currentPrice }) => {
  const classes = ['Coin'];

  if (oldPrice < currentPrice) {
    classes.push('up');
  } else if (oldPrice > currentPrice) {
    classes.push('down');
  }

  return (
    <div className={classes.join(' ')}>
      <span>{coin}</span>
      <span>R$ {currentPrice.toLocaleString()}</span>
    </div>
  );
};

export default Coin;
