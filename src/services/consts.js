export const COLOR = {
  BLACK: 'black',
  BLUE: 'blue',
  CYAN: 'cyan',
  GRAY: 'gray',
  GREEN: 'green',
  MAGENTA: 'magenta',
  ORANGE: 'orange',
  PURPLE: 'purple',
  RED: 'red',
  WHITE: 'white',
  YELLOW: 'yellow',
};

export const SERVER_DATA_KEYS = {
  TIME: 'time',
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
};

export const DEFAULT_LINE_SERIES_CONFIG = {
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
  crosshairMarkerVisible: false,
};

export const TIMEFRAME_OPTIONS = {
  _15M: '15m',
  _30M: '30m',
  _1H: '1h',
  _2H: '2h',
  _4H: '4h',
  _8H: '8h',
  _1D: '1D',
  _1W: '1W',
  _2W: '2W',
  _1M: '1M',
};

export const ASSETS = {
  BTC: 'BTC',
  ETH: 'ETH',
  ADA: 'ADA',
  ICP: 'ICP',
  DOGE: 'DOGE'
};

export const CHART_CONFIG_REDUCER_ACTIONS = {
  // ASSET_NAME
  SET_ASSET_NAME: 'SET_ASSET_NAME',
  // TIMEFRAME
  SET_TIMEFRAME: 'SET_TIMEFRAME',
  // CONFIG
  SET_DEFAULT_CONFIG: 'SET_DEFAULT_CONFIG',
  SET_CONFIG: 'SET_CHART_CONFIG',
  CLEAR_CONFIG: 'CLEAR_CHART_CONFIG',
  // INDICATORS
  TOGGLE_INDICATOR: 'TOGGLE_INDICATOR',
  TINKER_INDICATOR: 'TINKER_INDICATOR',
};

export const DEFAULT_CHART_CONFIG = {
  assetName: ASSETS.BTC,
  timeframe: TIMEFRAME_OPTIONS._1D,
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
};