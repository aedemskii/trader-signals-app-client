import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import '../styles/AssetChart.css';
import { requestChartData } from '../services/serverRequests';
import { createMyChart } from '../services/chartConfiguration';

const AssetChart = () => {
  const [ chartData, setChartData ] = useState([]);
  const [ candleData, setCandleData ] = useState(null);
  const { assetName } = useParams();
  const chartContainerRef = useRef();
  let timeframe = '1D';

  useEffect(() => {
    (async () => {
      const data = await requestChartData(assetName, timeframe);
      setChartData(data);
    })();    
  }, [assetName, timeframe]);

  useEffect(() => {  
    const { chart, candlestickSeries } = createMyChart(chartContainerRef.current, chartData);

    // OHLC Values
    chart.subscribeCrosshairMove((param) => {
      setCandleData({...param.seriesData.get(candlestickSeries)})
    })

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [chartData]);


  return (
    <div>
      <h2>{`${assetName} Price History Chart`}</h2>
      {false ? (
          <div>Loading...</div>
        ) : (          
          <div className='tv-chart' ref={chartContainerRef}>
            {candleData && (
              <div className={`ohlc ohlc-${candleData.open > candleData.close? 'green' :'red'}`}>
                <div>O: <span>{candleData.open}</span></div>
                <div>H: <span>{candleData.high}</span></div>
                <div>L: <span>{candleData.low}</span></div>
                <div>C: <span>{candleData.close}</span></div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default AssetChart;
