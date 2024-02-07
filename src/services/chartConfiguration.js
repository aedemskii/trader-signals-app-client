import { createChart, ColorType } from 'lightweight-charts';

const COLOR = {
  BLACK: "black",
  BLUE: "blue",
  CYAN: "cyan",
  GRAY: "gray",
  GREEN: "green",
  MAGENTA: "magenta",
  ORANGE: "orange",
  PURPLE: "purple",
  RED: "red",
  WHITE: "white",
  YELLOW: "yellow",
};

const defLineConfig = {
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
  crosshairMarkerVisible: false,
}

const KEY = {
  TIME: 'time',
  SMA: 'sma',
  EMA: 'ema',
  MACD_F: 'macd-macd',
  MACD_S: 'macd-signal',
  MACD_H: 'macd-hist',
  RSI: 'rsi',
  BBANDS_SMA: 'bbands_sma',
  BBANDS_HIGH: 'bbands-higher',
  BBANDS_LOW: 'bbands-lower',
  STOCHRSI_S: 'stochrsi-slow',
  STOCHRSI_F: 'stochrsi-fast',
}

export const createMyChart = (container, chartData) => {
  const chart = createChart(container, {
    layout: {
      background: { type: ColorType.Solid, color: COLOR.WHITE },
      textColor: COLOR.BLACK,
    },
    crosshair: {
      mode: 0,
    },
    width: container.clientWidth,
    height: 500,
    pane: 0,
  });
  chart.timeScale().fitContent();

  const {
    smaData,
    emaData,
    macdData,
    rsiData,
    bbandsData,
    stochRsiData,
  } = parseChartData(chartData)

  // Setting indicators
  addBBands(chart, bbandsData);
  addSMA(chart, smaData);
  addEMA(chart, emaData);
  addRSI(chart, rsiData);
  addMACD(chart, macdData);  
  addStochRSI(chart, stochRsiData);

  // Candlesticks
  const candlestickSeries = chart.addCandlestickSeries();
  candlestickSeries.setData(chartData);

  return {
    chart: chart,
    candlestickSeries: candlestickSeries,
  };
};

const parseChartData = (data) => {
  const result = {
    smaData: [],
    emaData: [],
    macdData: {
      fast: [],
      slow: [],
      hist: [],
    },
    rsiData: [],
    bbandsData: {
      up: [],
      mid: [],
      low: [],
    },
    stochRsiData: {
      slow: [],
      fast: [],
    }
  }

  data.forEach((item) => {
    result.smaData.push({
      time: item[KEY.TIME], 
      value: item[KEY.SMA]
    });
    result.emaData.push({
      time: item[KEY.TIME], 
      value: item[KEY.EMA],
    });
    result.macdData.fast.push({
      time: item[KEY.TIME], 
      value: item[KEY.MACD_F],
    });
    result.macdData.slow.push({
      time: item[KEY.TIME],
      value: item[KEY.MACD_S],
    });
    result.macdData.hist.push({
      time: item[KEY.TIME],
      value: item[KEY.MACD_H],
      color: item[KEY.MACD_H] > 0? COLOR.GREEN : COLOR.RED,
    });
    result.rsiData.push({
      time: item[KEY.TIME],
      value: item[KEY.RSI],
    });
    result.bbandsData.up.push({
      time: item[KEY.TIME],
      value: item[KEY.BBANDS_HIGH],
    });
    result.bbandsData.mid.push({
      time: item[KEY.TIME],
      value: item[KEY.BBANDS_SMA],
    });
    result.bbandsData.low.push({
      time: item[KEY.TIME],
      value: item[KEY.BBANDS_LOW],
    });
    result.stochRsiData.slow.push({
      time: item[KEY.TIME],
      value: item[KEY.STOCHRSI_S],
    });
    result.stochRsiData.fast.push({
      time: item[KEY.TIME],
      value: item[KEY.STOCHRSI_F],
    });
  });

  return result;
};

const addBBands = (chart, data) => {
    const bbandsUp = chart.addLineSeries({ ...defLineConfig, color: COLOR.CYAN });
    bbandsUp.setData(data.up);
    const bbandsMid = chart.addLineSeries({ ...defLineConfig, color: COLOR.GRAY});
    bbandsMid.setData(data.mid);
    const bbandsLow = chart.addLineSeries({ ...defLineConfig, color: COLOR.CYAN});
    bbandsLow.setData(data.low);
}

const addSMA = (chart, data) => {
  const smaSeries = chart.addLineSeries({ ...defLineConfig, color: COLOR.BLUE});
  smaSeries.setData(data);
}

const addEMA = (chart, data) => {
  const emaSeries = chart.addLineSeries({ ...defLineConfig, color: COLOR.MAGENTA});
  emaSeries.setData(data);
}

const addRSI = (chart, data) => {
  const rsiSeries = chart.addLineSeries({ ...defLineConfig, color: COLOR.PURPLE, pane: 1 });
  rsiSeries.setData(data);
  rsiSeries.createPriceLine({
    price: 70,
    color: COLOR.GRAY,
    lineStyle: 3
  });
  rsiSeries.createPriceLine({
    price: 30,
    color: COLOR.GRAY,
    lineStyle: 3
  });
}

const addMACD = (chart, data) => {
  const macdFastSeries = chart.addLineSeries({ ...defLineConfig, color: COLOR.ORANGE, pane: 2 });
  macdFastSeries.setData(data.fast);
  const macdSlowSeries = chart.addLineSeries({ ...defLineConfig, color: COLOR.BLUE, pane: 2 });
  macdSlowSeries.setData(data.slow);
  const macdHistogramSeries = chart.addHistogramSeries({ ...defLineConfig, pane: 2 });
  macdHistogramSeries.setData(data.hist);
}

const addStochRSI = (chart, data) => {
  const stochRsiSlowSeries = chart.addLineSeries({...defLineConfig, color: COLOR.RED, pane: 3 });
  stochRsiSlowSeries.setData(data.slow);
  const stochRsiFastSeries = chart.addLineSeries({...defLineConfig, color: COLOR.GREEN, pane: 3 });
  stochRsiFastSeries.setData(data.fast);
}