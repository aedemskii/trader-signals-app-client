import React, { useReducer, useEffect } from 'react';
import {
  ASSETS,
  TIMEFRAME_OPTIONS,
  CHART_CONFIG_REDUCER_ACTIONS as ACTIONS,
  DEFAULT_CHART_CONFIG
} from '../services/consts';

export const ChartContext = React.createContext();

export const ChartProvider = ({children}) => {
  const [ chartConfig, chartConfigDispatch ] = useReducer(chartConfigReducer, DEFAULT_CHART_CONFIG);

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('chartConfig'));
    chartConfigDispatch({ type: ACTIONS.SET_CONFIG, payload: config});
  }, []);

  useEffect(() => {
    localStorage.setItem('chartConfig', JSON.stringify(chartConfig));
  }, [chartConfig]);

  return (
    <ChartContext.Provider value={{ chartConfig, chartConfigDispatch }}>
      {children}
    </ChartContext.Provider>
  );
}

const chartConfigReducer = (chartConfig, action) => {
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
      if (action.payload?.timeframe && Object.values(TIMEFRAME_OPTIONS).includes(action.payload.timeframe)) {
        return {
          ...chartConfig,
          timeframe: action.payload.timeframe
          };
      } else {
        return chartConfig;
      }
    }
    case ACTIONS.GET_DEFAULT_CONFIG:
      return DEFAULT_CHART_CONFIG;
    case ACTIONS.SET_CONFIG:
    {
      if (action.payload) {
        return action.payload;
      } else {
        return chartConfig;
      }
    }
    case ACTIONS.CLEAR_CONFIG:
      return {
        assetName: chartConfig.assetName,
        timeframe: chartConfig.timeframe
      };
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
      // TODO - handle tinkering
      return chartConfig;
    }
    default:
      return chartConfig;
  }
};