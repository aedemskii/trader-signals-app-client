import AssetChart from './AssetChart';
import { ControlPanel } from './ControlPanel';
import { ChartConfigPanel } from './ChartConfigPanel';
import { ChartContextProvider } from '../hooks/useChartContext';

function Home() {
  return (
    <>
      <ChartContextProvider>
        <ControlPanel />
        <h1>Asset Detail Page</h1>
        <ChartConfigPanel />
        <AssetChart />
      </ChartContextProvider>
    </>
  );
}

export default Home;