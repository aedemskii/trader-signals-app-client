import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { createChart, ColorType } from 'lightweight-charts';
import '../styles/AssetChart.css';

const AssetChart = () => {
  const [ chartData, setChartData ] = useState({'candlestick_data': [], smas: []});
  const [ candleData, setCandleData ] = useState(null);
  const { assetName } = useParams();
  const chartContainerRef = useRef();
  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
  }
  let timeframe = '1D';

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/assets/${assetName}/${timeframe}`);
        if (!response.ok) {
            throw new Error('There was an error in trade signals request');
        }
        const data = await response.json();
        console.log('fetch');
        setChartData(data);
      } catch (error) {
        console.error(`Error fetching ${assetName} trade signals:`, error);
      }
    };

    fetchPriceHistory()      
  }, [assetName]);

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: colors.backgroundColor },
          textColor: colors.textColor,
        },
        width: chartContainerRef.current.clientWidth, // * 0.6,
        height: 500,
        pane: 0
      });
      chart.timeScale().fitContent();

      // SMAs
      const myColors = ['green', 'red', 'blue', 'orange', 'cyan', 'magenta', 'yellow'];
      if (chartData['smas'] && Array.isArray(chartData['smas'])) {
        chartData['smas'].forEach((sma_length, index) => {          
          const smaSeries = chart.addLineSeries({ lineWidth: 1, color: myColors[index % myColors.length] });
          const smaData = chartData['candlestick_data']
            .map(point => ({time: point.time, value: point.sma[sma_length]}))
            .filter(point => point.value);
          smaSeries.setData(smaData);
        });
      }

      // Candlestick Chart
      const candlestickSeries = chart.addCandlestickSeries({ lineColor: colors.lineColor, topColor: colors.areaTopColor, bottomColor: colors.areaBottomColor });
      candlestickSeries.setData(chartData['candlestick_data']);

      // RSI
      const rsiSeries = chart.addLineSeries({ color: 'purple', lineWidth: 1, pane: 1 });
      const rsiData = chartData['candlestick_data']
        .map(point => ({time: point.time, value: point.rsi}))
        .filter(point => point.value);
      rsiSeries.setData(rsiData);
      rsiSeries.createPriceLine({
        price: 70,
        color: 'gray',
        lineStyle: 3
      });
      rsiSeries.createPriceLine({
        price: 30,
        color: 'gray',
        lineStyle: 3
      });


      // MACD
      const macdFastSeries = chart.addLineSeries({ color: 'orange', lineWidth: 1, pane: 2 });
      const macdFastData = chartData['candlestick_data']
        .map(point => ({time: point.time, value: point.macd}))
        .filter(point => point.value);
      macdFastSeries.setData(macdFastData);
      const macdSlowSeries = chart.addLineSeries({ color: 'blue', lineWidth: 1, pane: 2 });
      const macdSlow = chartData['candlestick_data']
        .map(point => ({time: point.time, value: point.signal}))
        .filter(point => point.value);
      macdSlowSeries.setData(macdSlow);
      const macdHistogramSeries = chart.addHistogramSeries({ color: 'purple', lineWidth: 1, pane: 2 });
      const macdHistogram = chartData['candlestick_data']
        .map(point => ({
          time: point.time, 
          value: point.histogram,
          color: point.histogram > 0? 'green' :'red'
        }))
        .filter(point => point.value);
      macdHistogramSeries.setData(macdHistogram);

      // Markers
      candlestickSeries.setMarkers(
        chartData['candlestick_data'].filter(d => d.long || d.short).map(d => (
          d.long ? {
            time: d.time,
            position: 'belowBar',
            color: 'green',
            shape: 'arrowUp',
            size: 2
          } : {
            time: d.time,
            position: 'aboveBar',
            color: 'red',
            shape: 'arrowDown',
            size: 2            
          }
      )));

      // OHLC Values
      chart.subscribeCrosshairMove((param) => {
        setCandleData({...param.seriesData.get(candlestickSeries)})
      })

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [chartData]
  );

  return (
    <div>
      <h2>{`${assetName} Price History Chart`}</h2>
      {false ? (
          <div>Loading...</div>
        ) : (          
          <div className='tv-chart' ref={chartContainerRef}>
            {candleData && (
              <div>
                <div className={`ohlc ohlc-${candleData.open > candleData.close? 'green' :'red'}`}>
                  <div>O: <span>{candleData.open}</span></div>
                  <div>H: <span>{candleData.high}</span></div>
                  <div>L: <span>{candleData.low}</span></div>
                  <div>C: <span>{candleData.close}</span></div>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default AssetChart;
