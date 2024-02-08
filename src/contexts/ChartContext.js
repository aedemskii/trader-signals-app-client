import React, { useState, useEffect } from 'react';

export const ChartContext = React.createContext();

export const ChartProvider = ({children}) => {
  const [ chartConfig, setchartConfig ] = useState({});

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('chartConfig'));
    setchartConfig(theme);
  }, []);

  const updateChartConfig = (data) => {
    setchartConfig({ ...chartConfig, ...data });
    localStorage.setItem('chartConfig', JSON.stringify(chartConfig));
  };

  const clearChartConfig = () => {
    setchartConfig({});
    localStorage.setItem('chartConfig', JSON.stringify({}));
  };

  return (
    <ChartContext.Provider value={{ chartConfig, updateChartConfig, clearChartConfig }}>
      {children}
    </ChartContext.Provider>
  );
}