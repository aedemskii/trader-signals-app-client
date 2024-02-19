import React from 'react';
import { useChartContext } from '../hooks/useChartContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { Select } from './Select';
import { DropdownMenu } from './DropdownMenu';
import { IndicatorConfig } from './IndicatorConfig';
import { CHART_CONFIG_REDUCER_ACTIONS as ACTIONS, ASSETS, TIMEFRAMES, INDICATORS } from '../services/consts';
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
          <div className='flex flex-ai-c flex-gap-5'>
            <div>Asset:</div>
            <Select onChange={handleAssetChange} values = {ASSETS} selectedValue={assetName} />
          </div>
          <div className='flex flex-ai-c flex-gap-5'>
            <div>Timeframe:</div>
            <Select onChange={handleTimeframeChange} values = {TIMEFRAMES} selectedValue={timeframe} />
          </div>
          <DropdownMenu
            title='Indicators Configuration'
            children={
              Object.values(INDICATORS).map(value => {
                return (
                  <IndicatorConfig
                    key={value}
                    indicatorName={value.toUpperCase()}
                    visible={indicatorsVisibles[value]}
                    toggleVisible={() => setIndicatorVisible(value)}
                  />
                );
              })} />
          <div />
        </div>
      </div>
    </div>
  );
};