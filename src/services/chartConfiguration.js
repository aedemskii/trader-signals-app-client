import { createChart, ColorType } from 'lightweight-charts';
import { COLOR, SERVER_DATA_KEYS as KEY, DEFAULT_LINE_SERIES_CONFIG as DLSC } from './consts';

export const createMyChart = (container, chartData, indicatorsVisibles) => {
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
  if (indicatorsVisibles.bbands)
    addBBands(chart, bbandsData);
  if (indicatorsVisibles.sma)
    addSMA(chart, smaData);
  if (indicatorsVisibles.ema)
    addEMA(chart, emaData);
  if (indicatorsVisibles.rsi)
    addRSI(chart, rsiData);
  if (indicatorsVisibles.macd)
    addMACD(chart, macdData);
  if (indicatorsVisibles.stochrsi)
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
    const bbandsUp = chart.addLineSeries({ ...DLSC, color: COLOR.GRAY, lineStyle: 1 });
    bbandsUp.setData(data.up);
    const bbandsMid = chart.addLineSeries({ ...DLSC, color: COLOR.GRAY });
    bbandsMid.setData(data.mid);
    const bbandsLow = chart.addLineSeries({ ...DLSC, color: COLOR.GRAY, lineStyle: 1 });
    bbandsLow.setData(data.low);
}

const addSMA = (chart, data) => {
  const smaSeries = chart.addLineSeries({ ...DLSC, color: COLOR.BLUE});
  smaSeries.setData(data);
}

const addEMA = (chart, data) => {
  const emaSeries = chart.addLineSeries({ ...DLSC, color: COLOR.MAGENTA});
  emaSeries.setData(data);
}

const addRSI = (chart, data) => {
  const rsiSeries = chart.addLineSeries({ ...DLSC, color: COLOR.PURPLE, pane: 1 });
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
  const macdFastSeries = chart.addLineSeries({ ...DLSC, color: COLOR.ORANGE, pane: 2 });
  macdFastSeries.setData(data.fast);
  const macdSlowSeries = chart.addLineSeries({ ...DLSC, color: COLOR.BLUE, pane: 2 });
  macdSlowSeries.setData(data.slow);
  const macdHistogramSeries = chart.addHistogramSeries({ ...DLSC, pane: 2 });
  macdHistogramSeries.setData(data.hist);
}

const addStochRSI = (chart, data) => {
  const stochRsiSlowSeries = chart.addLineSeries({...DLSC, color: COLOR.RED, pane: 3 });
  stochRsiSlowSeries.setData(data.slow);
  const stochRsiFastSeries = chart.addLineSeries({...DLSC, color: COLOR.GREEN, pane: 3 });
  stochRsiFastSeries.setData(data.fast);
  stochRsiSlowSeries.createPriceLine({
    price: 80,
    color: COLOR.GRAY,
    lineStyle: 3
  });
  stochRsiSlowSeries.createPriceLine({
    price: 20,
    color: COLOR.GRAY,
    lineStyle: 3
  });
}