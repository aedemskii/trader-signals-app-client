import React, { useReducer, useEffect, useContext } from 'react';
import {
  ASSETS,
  TIMEFRAMES,
  CHART_CONFIG_REDUCER_ACTIONS as ACTIONS,
  DEFAULT_CHART_CONFIG
} from '../services/consts';
import { TChartConfig, TChartConfigReducerAction, TChartContext } from '../services/types';

const ChartContext = React.createContext<TChartContext|null>(null);

export const ChartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const chartConfigLS = localStorage.getItem('chartConfig');
  const initialChartConfig = chartConfigLS ? JSON.parse(chartConfigLS) : DEFAULT_CHART_CONFIG;
  const [ chartConfig, chartConfigDispatch ] = useReducer(chartConfigReducer, initialChartConfig);

  useEffect(() => {
    localStorage.setItem('chartConfig', JSON.stringify(chartConfig));
  }, [chartConfig]);

  return (
    <ChartContext.Provider value={{ chartConfig, chartConfigDispatch }}>
      {children}
    </ChartContext.Provider>
  );
}

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (context === null) {
    throw new Error('useChartContext must be used within a ChartContextProvider');
  }
  return context;
};

const chartConfigReducer = (chartConfig: TChartConfig, action: TChartConfigReducerAction): TChartConfig => {
  switch (action.type) {
    case ACTIONS.SET_ASSET_NAME:
    {
      if (action.payload?.assetName && Object.values(ASSETS).includes(action.payload.assetName)) {
        return {
          ...chartConfig,
            assetName: action.payload.assetName
          };
      } else {
        return chartConfig;
      }
    }
    case ACTIONS.SET_TIMEFRAME:
    {
      if (action.payload?.timeframe && Object.values(TIMEFRAMES).includes(action.payload.timeframe)) {
        return {
          ...chartConfig,
          timeframe: action.payload.timeframe
          };
      } else {
        return chartConfig;
      }
    }
    case ACTIONS.SET_DEFAULT_CONFIG:
      return DEFAULT_CHART_CONFIG;
    case ACTIONS.SET_CONFIG:
    {
      if (action.payload) {
        return { ...DEFAULT_CHART_CONFIG, ...action.payload };
      } else {
        return chartConfig;
      }
    }
    case ACTIONS.TOGGLE_INDICATOR:
    {
      if (!action.payload?.indicatorName)
        return chartConfig;
      return {
        ...chartConfig,
        indicatorsVisibles: {
          ...chartConfig.indicatorsVisibles,
          [action.payload.indicatorName]: !chartConfig.indicatorsVisibles[action.payload.indicatorName]
        }
      };
    }
    case ACTIONS.TINKER_INDICATOR:
    {
      // TODO: - handle tinkering
      return chartConfig;
    }
    default:
      return chartConfig;
  }
};