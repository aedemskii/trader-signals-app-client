import React, { useState, useEffect } from 'react';
import { COLOR } from '../services/consts';
import { TCandleData, TColor } from '../services/types';
import '../styles/utils.css';

export const CandlestickOHLC = ({ candleData } : { candleData: TCandleData | null }) => {
  const [ textColor, setTextColor ] = useState<TColor>(COLOR.BLACK);
  const [ candle, setCandle ] = useState<TCandleData | null>(null);
  const [ width, setWidth ] = useState(0);

  useEffect(() => {
    if (candleData) {
      setTextColor(candleData.open > candleData.close ? COLOR.GREEN : COLOR.RED);
      setCandle(candleData);
      let maxLen = Math.max(
        candleData.open.toString().length,
        candleData.close.toString().length,
        candleData.high.toString().length,
        candleData.low.toString().length
        );
      setWidth(maxLen * 9); // TODO - remove magic number
    } else if (candle) {
      setCandle(prev => prev);
    } else {
      setCandle(null);
    }
  }, [candleData]);

  // TODO - handle repeating code
  return (
    <>
      {candle &&
        <div className='flex ohlc-holder'>
          <div className='flex ohlc-value'>
            <div>O</div>
            <div style={{color: textColor, width: width}}>{candle.open}</div>
          </div>
          <div className='flex ohlc-value'>
            <div>H</div>
            <div style={{color: textColor, width: width}}>{candle.high}</div>
          </div>
          <div className='flex ohlc-value'>
            <div>L</div>
            <div style={{color: textColor, width: width}}>{candle.low}</div>
          </div>
          <div className='flex ohlc-value'>
            <div>C</div>
            <div style={{color: textColor, width: width}}>{candle.close}</div>
          </div>
        </div>
      }
    </>
  );
};