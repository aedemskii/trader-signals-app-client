import { useNavigate } from'react-router-dom';
import AssetChart from './AssetChart';
import { ControlPanel } from './ControlPanel';
import { ChartConfigPanel } from './ChartConfigPanel';
import { ChartProvider } from '../hooks/ChartContext';
import { TAsset } from '../services/types';

function AssetDetailPage({ assetName }: { assetName: TAsset }) {
  const navigate = useNavigate();

  return (
    <>
      <ChartProvider>
        <ControlPanel />
        <button onClick={() => navigate('/assets')}>Back to Assets</button>
        <h1>Asset Detail Page</h1>
        <ChartConfigPanel />
        <AssetChart />
      </ChartProvider>
    </>
  );
}

export default AssetDetailPage;