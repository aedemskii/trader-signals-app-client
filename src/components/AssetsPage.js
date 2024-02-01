import { useNavigate } from'react-router-dom';

function AssetsPage() {
  const navigate = useNavigate();

  function goToAssetDetailsPage(assetName) {
    navigate(`/assets/${assetName}`);
  }

  const assets = ["BTC", "ETH", "ADA", "ICP", "DOGE"];

  return (
    <div>
      <h1>Assets Page</h1>
      {assets.map((asset) => (
        <button key={asset} onClick={() => goToAssetDetailsPage(asset)}>
          {asset}
        </button>
      ))}
    </div>
  );
}
  
export default AssetsPage;