import { useNavigate } from'react-router-dom';
import { requestAuth } from '../services/serverRequests';

function AuthPage() {
  const navigate = useNavigate();

  async function enterApp() {
    const data = await requestAuth('please enter app');
    if (data === null) {
      console.log("Error in auth request");
    }
    if (data['my-message'] === 'success') {
      console.log("App entered successfully");
      navigate("/assets");
    }
  }

  return (
    <div>
      <button onClick={enterApp}>Enter App</button>
    </div>
  );
};

export default AuthPage;