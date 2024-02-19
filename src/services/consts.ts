import { TChartConfig } from './types';

export const COLOR = {
  BLACK: 'black',
  BLUE: 'blue',
  CYAN: 'cyan',
  DIMGRAY: 'dimgray',
  GRAY: 'gray',
  GREEN: 'green',
  MAGENTA: 'magenta',
  ORANGE: 'orange',
  PURPLE: 'purple',
  RED: 'red',
  WHITE: 'white',
  YELLOW: 'yellow',
} as const;

export const SERVER_DATA_KEYS = {
  TIME: 'time',
  OPEN: 'open',
  HIGH: 'high',
  LOW: 'low',
  CLOSE: 'close',
  SMA: 'sma',
  EMA: 'ema',
  MACD_F: 'macd-macd',
  MACD_S: 'macd-signal',
  MACD_H: 'macd-hist',
  RSI: 'rsi',
  BBANDS_SMA: 'bbands-sma',
  BBANDS_HIGH: 'bbands-higher',
  BBANDS_LOW: 'bbands-lower',
  STOCHRSI_S: 'stochrsi-slow',
  STOCHRSI_F: 'stochrsi-fast',
} as const;

export const DEFAULT_LINE_SERIES_CONFIG = {
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
  crosshairMarkerVisible: false,
} as const;

export const ASSETS = {
  BTC: 'BTC',
  ETH: 'ETH',
  ADA: 'ADA',
  ICP: 'ICP',
  DOGE: 'DOGE'
} as const;

export const TIMEFRAMES = {
  _15M: '15m',
  _30M: '30m',
  _1H: '1h',
  _2H: '2h',
  _4H: '4h',
  _8H: '8h',
  _1D: '1D',
  _1W: '1W',
  _1M: '1M',
} as const;

export const INDICATORS = {
  SMA: 'sma',
  EMA: 'ema',
  RSI: 'rsi',
  MACD:'macd',
  BBANDS: 'bbands',
  STOCHRSI:'stochrsi',
} as const;

export const CHART_CONFIG_REDUCER_ACTIONS = {
  // ASSET_NAME
  SET_ASSET_NAME: 'SET_ASSET_NAME',
  // TIMEFRAME
  SET_TIMEFRAME: 'SET_TIMEFRAME',
  // CONFIG
  SET_DEFAULT_CONFIG: 'SET_DEFAULT_CONFIG',
  SET_CONFIG: 'SET_CHART_CONFIG',
  // INDICATORS
  TOGGLE_INDICATOR: 'TOGGLE_INDICATOR',
  TINKER_INDICATOR: 'TINKER_INDICATOR',
};

export const DEFAULT_CHART_CONFIG: TChartConfig = {
  assetName: ASSETS.BTC,
  timeframe: TIMEFRAMES._1D,
  indicatorsVisibles: {
    'sma': true,
    'ema': true,
    'rsi': true,
    'macd': true,
    'bbands': true,
    'stochrsi': true
  },
  indicatorsConfigs: {
      'sma': {
        length: 200
      },
      'ema': {
        length: 50
      },
      'rsi': {
        length: 14
      },
      'macd': {
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9
      },
      'bbands': {
        length: 20
      },
      'stochrsi': {
        length: 14,
        kPeriod: 3,
        dPeriod: 3
      }
  },
} as const;

export const DEFAULT_PRICE_LINE_CONFIG = {
  price: 50,
  color: 'gray',
  lineStyle: 1,
  lineWidth: 1,
  lineVisible: true,
  axisLabelVisible: true,
  title: '',
} as const;