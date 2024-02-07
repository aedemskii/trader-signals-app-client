import { useNavigate } from 'react-router-dom';
import { ASSETS, TIMEFRAME_OPTIONS as TF } from '../services/consts';

function AssetsPage() {
  const navigate = useNavigate();

  function goToAssetDetailsPage(assetName) {
    navigate(`/assets/${assetName}/${TF._1D}`);
  }

  return (
    <div>
      <h1>Assets Page</h1>
      {ASSETS.map((asset) => (
        <button key={asset} onClick={() => goToAssetDetailsPage(asset)}>
          {asset}
        </button>
      ))}
    </div>
  );
}

export default AssetsPage;