import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Logout({setLoggedIn,setLoginUsername}){
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:8000", // APIサーバーのアドレスを指定
  });
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/logout', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setLoggedIn(false);
      setLoginUsername('');
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        ログアウトしますか?
      </div>
      <button onClick={handleLogout}>
        ログアウト
      </button>
      <button onClick={()=>navigate("/")}>
        キャンセル
      </button>
    </>
  );
}

export default Logout;