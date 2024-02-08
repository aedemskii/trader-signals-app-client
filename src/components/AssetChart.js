import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AssetChart.css';
import { requestChartData } from '../services/serverRequests';
import { createMyChart } from '../services/chartConfiguration';
import { CandlestickOHLC } from './CandlestickOHLC';

const AssetChart = () => {
  const [ chartData, setChartData ] = useState([]);
  const [ candleData, setCandleData ] = useState(null);
  const { assetName, timeframe } = useParams();
  const chartContainerRef = useRef();

  useEffect(() => {
    (async () => {
      const data = await requestChartData(assetName, timeframe);
      setChartData(data);
    })();
  }, [assetName, timeframe]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const { chart, candlestickSeries } = createMyChart(chartContainerRef.current, chartData);

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
    }
  }, [chartData]);


  return (
    <>
      <h2>{`${assetName} Price History Chart`}</h2>
      {chartData.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div className='my-chart'>
            <div className='tv-chart' ref={chartContainerRef} />
            <div className='title flex'>
                <div>{`${assetName} / USDT`}&nbsp;&#8226;&nbsp;{`${timeframe}`}&nbsp;&#8226;&nbsp;</div>
                <CandlestickOHLC candleData={candleData} />
            </div>
          </div>
        )}
    </>
  );
};

export default AssetChart;
