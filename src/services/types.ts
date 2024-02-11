import {
  ASSETS,
  TIMEFRAMES,
  INDICATORS,
  COLOR,
  CHART_CONFIG_REDUCER_ACTIONS,
  SERVER_DATA_KEYS
} from './consts';

type ObjectValues<T> = T[keyof T];

export type TAsset = ObjectValues<typeof ASSETS>;
export type TTimeframe = ObjectValues<typeof TIMEFRAMES>;
export type TIndicatorName = ObjectValues<typeof INDICATORS>;
export type TColor = ObjectValues<typeof COLOR>;
type TChartConfigReducerActionType = ObjectValues<typeof CHART_CONFIG_REDUCER_ACTIONS>;

export type TChartConfigReducerAction = {
  type: TChartConfigReducerActionType;
  payload?: {
    assetName?: TAsset;
    timeframe?: TTimeframe;
    indicatorName?: TIndicatorName;
    indicatorConfig?: {
      [key: string]: any;
    };
  };
};

export type TChartConfig = {
  assetName: TAsset;
  timeframe: TTimeframe;
  indicatorsVisibles: TIndicatorsVisibles;
  indicatorsConfigs: TIndicatorsConfigs;
};

export type TIndicatorsVisibles = {
  [key in typeof INDICATORS[keyof typeof INDICATORS]]: boolean;
};

export type TIndicatorsConfigs = {
  [key: string]: any;
};

export type TThemeContext = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

export type TChartContext = {
  chartConfig: TChartConfig;
  chartConfigDispatch: React.Dispatch<TChartConfigReducerAction>;
};

export type TCandleData = {
  open: number;
  high: number;
  low: number;
  close: number;
};

export type TServerChartDataItem = {
  [key in typeof SERVER_DATA_KEYS[keyof typeof SERVER_DATA_KEYS]]: number;
};