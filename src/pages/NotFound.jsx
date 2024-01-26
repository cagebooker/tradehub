import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(()=>{
      navigate('/')
    },3000)
  }, [navigate]);
  return <>
    <h3>404 Not Found</h3>
    <h4>3 秒後跳轉回首頁...</h4>
  </>
}
export default NotFound;