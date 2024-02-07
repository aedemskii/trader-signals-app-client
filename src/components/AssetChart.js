import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { createChart, ColorType } from 'lightweight-charts';
import '../styles/AssetChart.css';
import { requestChartData } from '../services/serverRequests';

const AssetChart = () => {
  const [ chartData, setChartData ] = useState([]);
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
    (async () => {
      const data = await requestChartData(assetName, timeframe);
      setChartData(data);
    })();    
  }, [assetName, timeframe]);

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

      const myColors = ['green', 'red', 'blue', 'orange', 'cyan', 'magenta', 'yellow'];

      // SMA
      const smaSeries = chart.addLineSeries({ lineWidth: 1, color: myColors[0] });
      const smaData = chartData
        .reduce( (res, point) => {
          if (point.time && point.sma) {
            res.push({time: point.time, value: point.sma});
          }
          return res;
        }, []);
      smaSeries.setData(smaData);

      // EMA
      const emaSeries = chart.addLineSeries({ lineWidth: 1, color: myColors[1] });
      const emaData = chartData
        .reduce( (res, point) => {
          if (point.time && point.ema) {
            res.push({time: point.time, value: point.ema});
          }
          return res;
        }, []);
      emaSeries.setData(emaData);

      // Candlestick Chart
      const candlestickSeries = chart.addCandlestickSeries({ lineColor: colors.lineColor, topColor: colors.areaTopColor, bottomColor: colors.areaBottomColor });
      candlestickSeries.setData(chartData);

      // RSI
      const rsiSeries = chart.addLineSeries({ color: 'purple', lineWidth: 1, pane: 1 });
      const rsiData = chartData
        .reduce( (res, point) => {
          if (point.time && point.rsi) {
            res.push({time: point.time, value: point.rsi});
          }
          return res;
        }, []);
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
      const macdFastData = chartData
        .reduce( (res, point) => {
          if (point.time && point['macd-macd']) {
            res.push({time: point.time, value: point['macd-macd']});
          }
          return res;
        }, []);
      macdFastSeries.setData(macdFastData);
      const macdSlowSeries = chart.addLineSeries({ color: 'blue', lineWidth: 1, pane: 2 });
      const macdSlow = chartData
        .reduce( (res, point) => {
          if (point.time && point['macd-signal']) {
            res.push({time: point.time, value: point['macd-signal']});
          }
          return res;
        }, []);
      macdSlowSeries.setData(macdSlow);
      const macdHistogramSeries = chart.addHistogramSeries({ color: 'purple', lineWidth: 1, pane: 2 });
      const macdHistogram = chartData
        .reduce( (res, point) => {
          if (point.time && point['macd-hist']) {
            res.push({
              time: point.time, 
              value: point['macd-hist'],
              color: point['macd-hist'] > 0? 'green' :'red'
            });
          }
          return res;
        }, []);
      macdHistogramSeries.setData(macdHistogram);

      // Markers
      candlestickSeries.setMarkers(
        chartData.filter(d => d.long || d.short).map(d => (
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
