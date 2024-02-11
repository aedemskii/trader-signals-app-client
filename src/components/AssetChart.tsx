import React, { useState, useEffect, useRef } from 'react';
import '../styles/AssetChart.css';
import { requestChartData } from '../services/serverRequests';
import { createMyChart } from '../services/chartConfiguration';
import { CandlestickOHLC } from './CandlestickOHLC';
import { useChartContext } from '../hooks/ChartContext';
import { TCandleData } from '../services/types';

const AssetChart = () => {
  const [ chartData, setChartData ] = useState([]);
  const [ candleData, setCandleData ] = useState<TCandleData|null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { chartConfig } = useChartContext();
  const { assetName, timeframe, indicatorsVisibles } = chartConfig;

  useEffect(() => {
    (async () => {
      const data = await requestChartData(chartConfig);
      setChartData(data);
    })();
  }, [assetName, timeframe]);

  useEffect(() => {
    if (chartContainerRef?.current && indicatorsVisibles) {
      const { chart, candlestickSeries } = createMyChart(chartContainerRef.current, chartData, indicatorsVisibles);

      chart.subscribeCrosshairMove((param) => {
        setCandleData({...param.seriesData.get(candlestickSeries)} as TCandleData)
      })

      const handleResize = () => {
        if (chartContainerRef.current?.clientWidth)
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [chartData, indicatorsVisibles]);


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
