import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Coin from '../Coin';
import './index.css';

interface HeaderProps {
  onSelected: (coin: string) => void;
}

interface Price {
  [key: string]: { oldPrice: number; currentPrice: number };
}

const allPrices: Price = {
  BTC: { oldPrice: 0, currentPrice: 0 },
  LTC: { oldPrice: 0, currentPrice: 0 },
  ETH: { oldPrice: 0, currentPrice: 0 },
  LINK: { oldPrice: 0, currentPrice: 0 },
  YFI: { oldPrice: 0, currentPrice: 0 },
  BCH: { oldPrice: 0, currentPrice: 0 },
  XRP: { oldPrice: 0, currentPrice: 0 },
  UNI: { oldPrice: 0, currentPrice: 0 },
  EOS: { oldPrice: 0, currentPrice: 0 },
  TRX: { oldPrice: 0, currentPrice: 0 },
};

const Header: React.FC<HeaderProps> = ({ onSelected }) => {
  const [prices, setPrices] = useState<Price>(allPrices);

  useEffect(() => {
    const intervals = Object.keys(allPrices).map((coin) => {
      return setInterval(() => {
        api.get(`price?fsym=${coin}&tsyms=BRL`).then((response) => {
          setPrices((prevState) => {
            if (prevState[coin].currentPrice === response.data.BRL) {
              return prevState;
            }

            return {
              ...prevState,
              [coin]: {
                oldPrice: prevState[coin].currentPrice,
                currentPrice: response.data.BRL,
              },
            };
          });
        });
      }, 5000);
    });
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  return (
    <div className="Header">
      {Object.keys(prices).map((coin) => (
        <div onClick={() => onSelected(coin)}>
          <Coin
            coin={coin}
            oldPrice={prices[coin].oldPrice}
            currentPrice={prices[coin].currentPrice}
          />
        </div>
      ))}
    </div>
  );
};

export default Header;
