import { useNavigate } from'react-router-dom';
import AssetChart from './AssetChart';
import { TIMEFRAME_OPTIONS as TF } from '../services/consts';

function AssetDetailPage({ assetName }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Asset Detail Page</h1>
      <button onClick={() => navigate('/assets')}>Back to Assets</button>
      <AssetChart
        assetName={assetName}
        timeframe={TF._1D}
        />
    </div>
  );
}

export default AssetDetailPage;