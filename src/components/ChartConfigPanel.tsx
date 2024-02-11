import React from 'react';
import { useChartContext } from '../hooks/ChartContext';
import { CHART_CONFIG_REDUCER_ACTIONS as ACTIONS, ASSETS, TIMEFRAMES } from '../services/consts';
import { TAsset, TTimeframe, TIndicatorName } from '../services/types';
import '../styles/utils.css'

export const ChartConfigPanel = () => {
  const { chartConfig, chartConfigDispatch } = useChartContext();
  const { assetName, timeframe, indicatorsVisibles } = chartConfig;

  const setIndicatorVisible = (indicatorName: TIndicatorName) => {
    chartConfigDispatch({
      type: ACTIONS.TOGGLE_INDICATOR,
      payload: { indicatorName }
    });
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const assetName = e.currentTarget.value as TAsset;
    chartConfigDispatch({ type: ACTIONS.SET_ASSET_NAME, payload: {assetName: assetName}})
  }

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const timeframe = e.currentTarget.value as TTimeframe;
    chartConfigDispatch({ type: ACTIONS.SET_TIMEFRAME, payload: {timeframe: timeframe}})
  }

  return (
    <div className='chart-config-panel'>
      <div className='title'>Chart Configuration</div>
      <div className='controls flex flex-jc-sb'>
        <div className='flex'>
          <div>Asset:</div>
          <select
            defaultValue={assetName}
            onChange={handleAssetChange}
          >
            {
              Object.keys(ASSETS).map((asset) => (
                <option
                  key={asset}
                  value={ASSETS[asset as keyof typeof ASSETS]}>
                    {ASSETS[asset as keyof typeof ASSETS]}
                </option>
              ))
            }
          </select>
        </div>
        <div className='flex'>
          <div>Timeframe:</div>
          <select
            defaultValue={timeframe}
            onChange={handleTimeframeChange}
          >
            {
              Object.keys(TIMEFRAMES).map((timeframe_option) => (
                <option
                  key={timeframe_option}
                  value={TIMEFRAMES[timeframe_option as keyof typeof TIMEFRAMES]}>
                    {TIMEFRAMES[timeframe_option as keyof typeof TIMEFRAMES]}
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
        <div />
      </div>
    </div>
  );
};