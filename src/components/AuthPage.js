import { useNavigate } from'react-router-dom';
import ServerRequests from '../services/serverRequests';

function AuthPage() {
  const navigate = useNavigate();
  
  async function enterApp() {
    try {
      const data = await ServerRequests.requestAuth('please enter app');
      if (data['my-message'] === 'success') {
        console.log("App entered successfully");
        navigate("/assets");
      } else {
        console.log("Error entering app");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={enterApp}>Enter App</button>
    </div>
  );
};
  
export default AuthPage;