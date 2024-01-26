import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  //@ ==================== variables ====================
  const navigate = useNavigate();
  const sidebarItem = [
    {id:'sidebar01', label:"交易紀錄", link: "/"},
    {id:'sidebar02', label:"策略", link: "/strategy"},
    {id:'sidebar03', label:"觀察名單", link: "/watchlist"},
    {id:'sidebar04', label:"我的資料", link: "/membership"} 
  ]
  //@ ==================== functions ====================
  const hover = () => {
    document.querySelector('.sidebar_hover').classList.add('sidebar_hover-active')
  }
  const endHover = () => {
    document.querySelector('.sidebar_hover').classList.remove('sidebar_hover-active')
  }
  const nailSidebar = () => {
    const el = document.querySelector('.sidebar_hover');
    const main = document.querySelector('.tradeRecord');
    console.log(el.classList[1])
    if(el.classList[1]){
      if(el.classList[1]?.includes('sidebar_hover-nailed')){
        main.classList.remove('tradeRecord_withSidebar')
        el.classList.remove('sidebar_hover-nailed')
      }else{
        main.classList.add('tradeRecord_withSidebar')
        el.classList.add('sidebar_hover-nailed')
      }
    }
  }
  
  //@ ==================== useEffect ====================
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log(event);
      // 檢查是否按下 Command 鍵（Mac 上）或 Ctrl 鍵（Windows 上）
      const isCommandKey = event.metaKey || event.ctrlKey;
      
      // 檢查是否按下 "B" 鍵
      const isBKey = event.key === 'b';
      const el = document.querySelector('.sidebar_hover');
      const main = document.querySelector('.tradeRecord');
      
      // 如果同時按下 Command + B，執行你的操作
      if (isCommandKey && isBKey) {
        event.preventDefault(); // 防止預設行為，例如打開瀏覽器的書籤
        // 執行你的事件處理邏輯
        // console.log('Command + B 被按下');
        // 在這裡執行你想要的其他操作
        if (document.querySelector('.sidebar_hover-nailed')) {
          console.log('yes');
          el.classList.remove('sidebar_hover-nailed');
          main.classList.remove('tradeRecord_withSidebar');
        } else {
          console.log('no');
          el.classList.add('sidebar_hover-nailed');
          main.classList.add('tradeRecord_withSidebar');
        }
      }
    };
  
    // 添加事件監聽器
    document.addEventListener('keydown', handleKeyPress);
  
    // 在 useEffect 清理函數中移除事件監聽器
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  return <>
    <div className="sidebar" onMouseEnter={hover} onMouseLeave={endHover}>
      <div className="sidebar_hover">
        { sidebarItem.map((item) => (
          <div className="sidebar_hover-item" key={item.id} onClick={()=>navigate(`${item.link}`)}>{item.label}</div>
        )) }
      </div>
      <div className="sidebar_nail" onClick={()=>{nailSidebar()}}>定住</div>
    </div>
  </>
}
export default Sidebar