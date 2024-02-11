import { useNavigate } from 'react-router-dom';
import { ASSETS, TIMEFRAMES as TF } from '../services/consts';
import { TAsset } from '../services/types';

function AssetsPage() {
  const navigate = useNavigate();

  function goToAssetDetailsPage(assetName: TAsset) {
    navigate(`/assets/${assetName}/${TF._1D}`);
  }

  return (
    <div>
      <h1>Assets Page</h1>
      {Object.values(ASSETS).map((asset) => (
        <button key={asset} onClick={() => goToAssetDetailsPage(asset)}>
          {asset}
        </button>
      ))}
    </div>
  );
}

export default AssetsPage;