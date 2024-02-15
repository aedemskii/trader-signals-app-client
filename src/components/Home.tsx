import AssetChart from './AssetChart';
import { ControlPanel } from './ControlPanel';
import { ChartConfigPanel } from './ChartConfigPanel';
import { ChartContextProvider } from '../hooks/useChartContext';
import { useThemeContext } from '../hooks/useThemeContext';
import '../styles/Home.css';

function Home() {
  const { darkTheme } = useThemeContext();

  return (
    <div className={`home ${darkTheme ? 'dark' : 'light'}`}>
      <ChartContextProvider>
        <ControlPanel />
        <ChartConfigPanel />
        <AssetChart />
      </ChartContextProvider>
    </div>
  );
}

export default Home;