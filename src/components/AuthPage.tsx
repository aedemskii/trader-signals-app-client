import { useNavigate } from'react-router-dom';
import { requestAuth } from '../services/serverRequests';
import { useThemeContext } from '../hooks/useThemeContext';
import '../styles/AuthPage.css';
import '../styles/utils.css';

function AuthPage() {
  const navigate = useNavigate();
  const { darkTheme } = useThemeContext();

  async function enterApp() {
    const data = await requestAuth('please enter app');
    if (data === null) {
      throw new Error('Error in auth request');
    }
    if (data['my-message'] === 'success') {
      navigate('/home');
    }
  }

  return (
    <div className={`auth-page flex flex-jc-sa flex-ai-c ${darkTheme ? 'dark' : 'light'}`}>
      <div className='auth-window flex flex-jc-sa flex-ai-c'>
        <button onClick={enterApp}>Enter App</button>
      </div>
    </div>
  );
};

export default AuthPage;