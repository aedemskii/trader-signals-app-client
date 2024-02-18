import React from 'react';
import { useChartContext } from '../hooks/useChartContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { Select } from './Select';
import { CHART_CONFIG_REDUCER_ACTIONS as ACTIONS, ASSETS, TIMEFRAMES } from '../services/consts';
import { TAsset, TTimeframe, TIndicatorName } from '../services/types';
import '../styles/ChartConfigPanel.css'
import '../styles/utils.css'

export const ChartConfigPanel = () => {
  const { chartConfig, chartConfigDispatch } = useChartContext();
  const { assetName, timeframe, indicatorsVisibles } = chartConfig;
  const { darkTheme } = useThemeContext();

  const setIndicatorVisible = (indicatorName: TIndicatorName) => {
    chartConfigDispatch({
      type: ACTIONS.TOGGLE_INDICATOR,
      payload: { indicatorName }
    });
  };

  const handleAssetChange = (asset: string) => {
    const assetName = asset as TAsset;
    chartConfigDispatch({ type: ACTIONS.SET_ASSET_NAME, payload: {assetName: assetName}})
  }

  const handleTimeframeChange = (asset: string) => {
    const timeframe = asset as TTimeframe;
    chartConfigDispatch({ type: ACTIONS.SET_TIMEFRAME, payload: {timeframe: timeframe}})
  }

  return (
    <div className={`panel-container flex flex-jc-sa ${darkTheme ? 'dark' : 'light'}`}>
      <div className='chart-config-panel'>
        <div className='controls flex flex-jc-sb'>
          <div className='flex'>
            <div>Asset:</div>
            <Select onChange={handleAssetChange} values = {ASSETS} selectedValue={assetName} />
          </div>
          <div className='flex'>
            <div>Timeframe:</div>
            <Select onChange={handleTimeframeChange} values = {TIMEFRAMES} selectedValue={timeframe} />
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
    </div>
  );
};