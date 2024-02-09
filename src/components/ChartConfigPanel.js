import React, { useContext } from 'react';
import { ChartContext } from '../contexts/ChartContext';
import { CHART_CONFIG_REDUCER_ACTIONS as ACTIONS, ASSETS, TIMEFRAME_OPTIONS } from '../services/consts';
import '../styles/utils.css'

export const ChartConfigPanel = () => {
  const { chartConfig, chartConfigDispatch } = useContext(ChartContext);
  const { assetName, timeframe, indicatorsVisibles } = chartConfig;

  const setIndicatorVisible = (indicatorName) => {
    chartConfigDispatch({
      type: ACTIONS.TOGGLE_INDICATOR,
      payload: { indicatorName }
    });
  };

  return (
    <div className='chart-config-panel'>
      <div className='title'>Chart Configuration</div>
      <div className='controls flex flex-jc-sb'>
        <div className='flex'>
          <div>Asset:</div>
          <select
            defaultValue={assetName}
            onChange={(e) => chartConfigDispatch({ type: ACTIONS.SET_ASSET_NAME, payload: {assetName: e.currentTarget.value}})} 
          >
            {
              Object.keys(ASSETS).map((asset) => (
                <option
                  key={asset}
                  value={ASSETS[asset]}>
                    {ASSETS[asset]}
                </option>
              ))
            }
          </select>
        </div>
        <div className='flex'>
          <div>Timeframe:</div>
          <select
            defaultValue={timeframe}
            onChange={(e) => chartConfigDispatch({ type: ACTIONS.SET_TIMEFRAME, payload: {timeframe: e.currentTarget.value}})} 
          >
            {
              Object.keys(TIMEFRAME_OPTIONS).map((timeframe_option) => (
                <option
                  key={timeframe_option}
                  value={TIMEFRAME_OPTIONS[timeframe_option]}>
                    {TIMEFRAME_OPTIONS[timeframe_option]}
                </option>
              ))
            }
          </select>
        </div>
        <div className='flex'>
          <div>Indicators:</div>
          <div className='flex margin-lr-10'>
            <input
              type='checkbox' 
              checked={indicatorsVisibles.sma}
              onChange={(e) => setIndicatorVisible('sma')}
              />
            <div>SMA</div>
          </div>
          <div className='flex margin-lr-10'>
            <input
              type='checkbox'
              checked={indicatorsVisibles.ema}
              onChange={(e) => setIndicatorVisible('ema')}
              />
            <div>EMA</div>
          </div>
          <div className='flex margin-lr-10'>
            <input
              type='checkbox' 
              checked={indicatorsVisibles.rsi}
              onChange={(e) => setIndicatorVisible('rsi')}
              />
            <div>RSI</div>
          </div>
          <div className='flex margin-lr-10'>
            <input
              type='checkbox' 
              checked={indicatorsVisibles.macd}
              onChange={(e) => setIndicatorVisible('macd')}
              />
            <div>MACD</div>
          </div>
          <div className='flex margin-lr-10'>
            <input
              type='checkbox' 
              checked={indicatorsVisibles.bbands}
              onChange={(e) => setIndicatorVisible('bbands')}
              />
            <div>BBANDS</div>
          </div>
          <div className='flex margin-lr-10'>
            <input
              type='checkbox' 
              checked={indicatorsVisibles.stochrsi}
              onChange={(e) => setIndicatorVisible('stochrsi')}
              />
            <div>STOCHRSI</div>
          </div>
        </div>
        <div/>
      </div>
    </div>
  );
};