import { useNavigate } from'react-router-dom';
import AssetChart from './AssetChart';
import { TIMEFRAME_OPTIONS as TF } from '../services/consts';
import { ControlPanel } from './ControlPanel';
import { ChartProvider } from '../contexts/ChartContext';


function AssetDetailPage({ assetName }) {
  const navigate = useNavigate();

  return (
    <>
      <ChartProvider>
        <ControlPanel />
        <h1>Asset Detail Page</h1>
        <button onClick={() => navigate('/assets')}>Back to Assets</button>
        <AssetChart assetName={assetName} timeframe={TF._1D} />
      </ChartProvider>
    </>
  );
}

export default AssetDetailPage;