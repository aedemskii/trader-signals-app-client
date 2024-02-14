import { createChart, ColorType, IChartApi, SingleValueData, HistogramData, CandlestickData, Time } from 'lightweight-charts';
import { COLOR, SERVER_DATA_KEYS as KEY, DEFAULT_LINE_SERIES_CONFIG as DLSC, DEFAULT_PRICE_LINE_CONFIG } from './consts';
import { TIndicatorsVisibles, TServerChartDataItem } from './types';

// TODO - rewrite as a class
export const createMyChart = (container: HTMLDivElement, chartData: TServerChartDataItem[], indicatorsVisibles: TIndicatorsVisibles) => {
  const chart = createChart(container, {
    layout: {
      background: { type: ColorType.Solid, color: COLOR.WHITE },
      textColor: COLOR.BLACK,
    },
    crosshair: {
      mode: 0,
    },
    width: container.clientWidth,
    height: 500
  });
  chart.timeScale().fitContent();

  const {
    candlestickData,
    smaData,
    emaData,
    macdData,
    rsiData,
    bbandsData,
    stochRsiData,
  } = parseChartData(chartData)

  const paneCounter = (() => {
    let counter = 0;
    return () => {
      counter++;
      return counter;
    };
  })();

  // Setting indicators
  if (indicatorsVisibles.bbands)
    addBBands(chart, bbandsData);
  if (indicatorsVisibles.sma)
    addSMA(chart, smaData);
  if (indicatorsVisibles.ema)
    addEMA(chart, emaData);
  if (indicatorsVisibles.rsi)
    addRSI(chart, rsiData, paneCounter);
  if (indicatorsVisibles.macd)
    addMACD(chart, macdData, paneCounter);
  if (indicatorsVisibles.stochrsi)
    addStochRSI(chart, stochRsiData, paneCounter);

  // Candlesticks
  const candlestickSeries = chart.addCandlestickSeries();
  candlestickSeries.setData(candlestickData);

  return {
    chart: chart,
    candlestickSeries: candlestickSeries,
  };
};

const parseChartData = (data: TServerChartDataItem[]) => {
  const result: {
    candlestickData: CandlestickData[],
    smaData: SingleValueData[],
    emaData: SingleValueData[],
    rsiData: SingleValueData[],
    bbandsData: {
      up: SingleValueData[],
      mid: SingleValueData[],
      low: SingleValueData[],
    },
    macdData: {
      fast: SingleValueData[],
      slow: SingleValueData[],
      hist: HistogramData[],
    },
    stochRsiData: {
      slow: SingleValueData[],
      fast: SingleValueData[],
    }
  } = {
    candlestickData: [],
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

  data.forEach((item: TServerChartDataItem) => {
    result.candlestickData.push({
      time: item[KEY.TIME] as Time,
      open: item[KEY.OPEN],
      high: item[KEY.HIGH],
      low: item[KEY.LOW],
      close: item[KEY.CLOSE],
    });
    result.smaData.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.SMA]
    });
    result.emaData.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.EMA],
    });
    result.macdData.fast.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.MACD_F],
    });
    result.macdData.slow.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.MACD_S],
    });
    result.macdData.hist.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.MACD_H],
      color: item[KEY.MACD_H] > 0? COLOR.GREEN : COLOR.RED,
    });
    result.rsiData.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.RSI],
    });
    result.bbandsData.up.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.BBANDS_HIGH],
    });
    result.bbandsData.mid.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.BBANDS_SMA],
    });
    result.bbandsData.low.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.BBANDS_LOW],
    });
    result.stochRsiData.slow.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.STOCHRSI_S],
    });
    result.stochRsiData.fast.push({
      time: item[KEY.TIME] as Time,
      value: item[KEY.STOCHRSI_F],
    });
  });

  return result;
};

const addBBands = (chart: IChartApi, data: {up: SingleValueData[], mid: SingleValueData[], low: SingleValueData[]}) => {
    const bbandsUp = chart.addLineSeries({ ...DLSC, color: COLOR.GRAY, lineStyle: 1 });
    bbandsUp.setData(data.up);
    const bbandsMid = chart.addLineSeries({ ...DLSC, color: COLOR.GRAY });
    bbandsMid.setData(data.mid);
    const bbandsLow = chart.addLineSeries({ ...DLSC, color: COLOR.GRAY, lineStyle: 1 });
    bbandsLow.setData(data.low);
}

const addSMA = (chart: IChartApi, data: SingleValueData[]) => {
  const smaSeries = chart.addLineSeries({ ...DLSC, color: COLOR.BLUE});
  smaSeries.setData(data);
}

const addEMA = (chart: IChartApi, data: SingleValueData[]) => {
  const emaSeries = chart.addLineSeries({ ...DLSC, color: COLOR.MAGENTA});
  emaSeries.setData(data);
}

const addRSI = (chart: IChartApi, data: SingleValueData[], paneCounter: () => number) => {
  const pane = paneCounter();
  const rsiSeries = chart.addLineSeries({ ...DLSC, color: COLOR.PURPLE, pane: pane });
  rsiSeries.setData(data);
  rsiSeries.createPriceLine({
    ...DEFAULT_PRICE_LINE_CONFIG,
    price: 70,
    color: COLOR.GRAY,
    lineStyle: 3
  });
  rsiSeries.createPriceLine({
    ...DEFAULT_PRICE_LINE_CONFIG,
    price: 30,
    color: COLOR.GRAY,
    lineStyle: 3
  });
}

const addMACD = (chart: IChartApi, data: {fast: SingleValueData[], slow: SingleValueData[], hist: SingleValueData[]}, paneCounter: () => number) => {
  const pane = paneCounter();
  const macdFastSeries = chart.addLineSeries({ ...DLSC, color: COLOR.ORANGE, pane: pane });
  macdFastSeries.setData(data.fast);
  const macdSlowSeries = chart.addLineSeries({ ...DLSC, color: COLOR.BLUE, pane: pane });
  macdSlowSeries.setData(data.slow);
  const macdHistogramSeries = chart.addHistogramSeries({ ...DLSC, pane: pane });
  macdHistogramSeries.setData(data.hist);
}

const addStochRSI = (chart: IChartApi, data: {slow: SingleValueData[], fast: SingleValueData[]}, paneCounter: () => number) => {
  const pane = paneCounter();
  const stochRsiSlowSeries = chart.addLineSeries({...DLSC, color: COLOR.RED, pane: pane });
  stochRsiSlowSeries.setData(data.slow);
  const stochRsiFastSeries = chart.addLineSeries({...DLSC, color: COLOR.GREEN, pane: pane });
  stochRsiFastSeries.setData(data.fast);
  stochRsiSlowSeries.createPriceLine({
    ...DEFAULT_PRICE_LINE_CONFIG,
    price: 80,
    color: COLOR.GRAY,
    lineStyle: 3
  });
  stochRsiSlowSeries.createPriceLine({
    ...DEFAULT_PRICE_LINE_CONFIG,
    price: 20,
    color: COLOR.GRAY,
    lineStyle: 3
  });
}
