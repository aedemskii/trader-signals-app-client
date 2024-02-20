import React, { useState, useEffect, useRef } from 'react';
import { requestChartData } from '../services/serverRequests';
import { createMyChart } from '../services/chartConfiguration';
import { CandlestickOHLC } from './CandlestickOHLC';
import { useChartContext } from '../hooks/useChartContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { TCandleData } from '../services/types';
import '../styles/AssetChart.css';

const AssetChart = () => {
  const [ chartData, setChartData ] = useState([]);
  const [ candleData, setCandleData ] = useState<TCandleData|null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { chartConfig } = useChartContext();
  const { assetName, timeframe, indicatorsVisibles } = chartConfig;
  const { darkTheme } = useThemeContext();

  useEffect(() => {
    (async () => {
      const data = await requestChartData(chartConfig);
      setChartData(data);
    })();
  }, [assetName, timeframe]);

  // TODO: - make chart visible within the component and change layout options without rerendering the whole thing
  useEffect(() => {
    if (chartContainerRef?.current && indicatorsVisibles) {
      const { chart, candlestickSeries } = createMyChart(chartContainerRef.current, chartData, indicatorsVisibles, darkTheme);

      chart.subscribeCrosshairMove((param) => {
        const candleData = param.seriesData.get(candlestickSeries);
        setCandleData(candleData ? candleData as TCandleData : null);
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
  }, [chartData, indicatorsVisibles, darkTheme]);

  return (
    <>
      {chartData.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div className={`my-chart ${darkTheme ? 'dark' : 'light'}`}>
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
