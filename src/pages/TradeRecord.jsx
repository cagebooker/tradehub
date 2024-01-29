import { useSearchParams } from "react-router-dom"

const TradeRecord = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("test"))
  //@ ============================    變數    ============================
	// React, Redux && 第三方
	// 表單
	// Button && FilterBar status
	// 畫面資料
	// 彈窗 alert
	// loadingFlag
	// 正則表達式

	//@ ============================ Functions ============================
	
	//@ ============================    api.   ============================

	//@ ============================ useEffect ============================
	
	//@ ============================   子頁面   ============================
  const recordList = () => {
    return (
      <div className="recordList">123</div>
    )
  }
  const userInfo = () => {
    return (
      <div className="userInfo">
        <div className="userInfo_user">
          <div className="userInfo_user-avatar">
            <img src="https://placehold.co/400" alt="" />
          </div>
          <div className="userInfo_user-name">Kevin Gu</div>
          <div className="userInfo_user-title">初階交易者</div>
          <div className="userInfo_user-info">
            <div className="userInfo_user-info-count">
              <div className="subtitle">交易次數</div>
              <div className="content">132</div>
            </div>
            <div className="userInfo_user-info-asset">
              <div className="subtitle">資產</div>
              <div className="content">$ 1,000,000</div>
            </div>
            <div className="userInfo_user-info-winRate">
              <div className="subtitle">勝率</div>
              <div className="content">34.7%</div>
            </div>
          </div>
        </div>
        <div className="userInfo_title">
          交易分析
        </div>
        <div className="userInfo_analyze">222</div>
        <div className="userInfo_stockList">333</div>
      </div>
    )
  }
  return (
    <div className="tradeRecord">
      {userInfo()}
      {recordList()}
    </div>
  )
}
export default TradeRecord