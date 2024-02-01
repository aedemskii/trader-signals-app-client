import { useNavigate } from'react-router-dom';

import AssetChart from './AssetChart';

function AssetDetailPage({ assetName }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Asset Detail Page</h1>
      <button onClick={() => navigate('/assets')}>Back to Assets</button>
      <AssetChart assetName={assetName} />
    </div>
  );
}

export default AssetDetailPage;