import { useNavigate } from'react-router-dom';
import AssetChart from './AssetChart';
import { ControlPanel } from './ControlPanel';
import { ChartConfigPanel } from './ChartConfigPanel';
import { ChartContextProvider } from '../hooks/useChartContext';
import { TAsset } from '../services/types';

function AssetDetailPage({ assetName }: { assetName: TAsset }) {
  const navigate = useNavigate();

  return (
    <>
      <ChartContextProvider>
        <ControlPanel />
        <button onClick={() => navigate('/assets')}>Back to Assets</button>
        <h1>Asset Detail Page</h1>
        <ChartConfigPanel />
        <AssetChart />
      </ChartContextProvider>
    </>
  );
}

export default AssetDetailPage;