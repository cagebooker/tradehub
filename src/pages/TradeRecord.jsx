import React, {useState} from 'react';
// import { useSearchParams } from "react-router-dom"; 
import dayjs from 'dayjs';
import { DatePicker, Space, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
const { RangePicker } = DatePicker;
const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    index: `${i+1}`,
    stockNum: '2330',
    key: i.toString(),
    buyTime: '12/31 09:56',
    sellTime: '12-31 10:11',
    buyPrice: '142',
    sellPrice: '156', 
    amount: '1000',
    cost: '142,000',
    strategy: '追高',
    stopLoss: 139,
    outcome: '勝',
    profit: '2,000',
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
console.log(originData)

const TradeRecord = () => {
  // const [searchParams] = useSearchParams();
  //@ ============================    變數    ============================
	// React, Redux && 第三方
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
	// 表單
	// Button && FilterBar status
	// 畫面資料
	// 彈窗 alert
	// loadingFlag
	// 正則表達式

  const columns = [
    {
      title: '編號',
      dataIndex: 'index',
      width: '6%',
      editable: false,
    },
    {
      title: '股號',
      dataIndex: 'stockNum',
      width: '5%',
      editable: true,
    },
    {
      title: '買進時間',
      dataIndex: 'buyTime',
      width: '11%',
      editable: true,
    },
    {
      title: '賣出時間',
      dataIndex: 'sellTime',
      width: '11%',
      editable: true,
    },
    {
      title: '買進價格',
      dataIndex: 'buyPrice',
      width: '9%',
      editable: true,
    },
    {
      title: '賣出價格',
      dataIndex: 'sellPrice',
      width: '7%',
      editable: true,
    },
    {
      title: '股數',
      dataIndex: 'amount',
      width: '8%',
      editable: true,
    },
    {
      title: '支出成本',
      dataIndex: 'cost',
      width: '10%',
      editable: true,
    },
    {
      title: '策略',
      dataIndex: 'strategy',
      width: '7%',
      editable: true,
    },
    {
      title: '停損價',
      dataIndex: 'stopLoss',
      width: '7%',
      editable: true,
    },
    {
      title: '勝敗',
      dataIndex: 'outcome',
      width: '6%',
      editable: true,
    },
    {
      title: '損益',
      dataIndex: 'profit',
      width: '8%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width:'10%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable 
        ? (<span>
            <Typography.Link onClick={() => save(record.key)} style={{marginRight: 0,}}>
              儲存
            </Typography.Link><br />
            <Popconfirm title="確定取消？" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>) 
        : (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            編輯
          </Typography.Link>
        );
      },
    },
  ];
	//@ ============================ Functions ============================
	const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
	//@ ============================    api.   ============================

	//@ ============================ useEffect ============================
	
	//@ ============================   子頁面   ============================
  //! 不知道幹嘛的
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  //& 編輯時的
  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const recordList = () => {
    const onRangeChange = (dates, dateStrings) => {
      if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      } else {
        console.log('Clear');
      }
    };
    const rangePresets = [
      {
        label: '過去 7 天',
        value: [dayjs().add(-7, 'd'), dayjs()],
      },
      {
        label: '過去 14 天',
        value: [dayjs().add(-14, 'd'), dayjs()],
      },
      {
        label: '過去 30 天',
        value: [dayjs().add(-30, 'd'), dayjs()],
      },
      {
        label: '過去 90 天',
        value: [dayjs().add(-90, 'd'), dayjs()],
      },
    ];
    return (
      <div className="recordList">
        <div className="recordList_title">交易紀錄</div>
        <div className="recordList_filterBar">
          <div className="recordList_filterBar-items">
            <div className="recordList_filterBar-item">
              <div className="recordList_filterBar-item-title">股號</div>
              <input className="input" type="text" placeholder="EX. 2330"/>
            </div>
            <div className="recordList_filterBar-item">
              <div className="recordList_filterBar-item-title">日期</div>
              <Space direction="vertical" size={12}>
                <RangePicker presets={rangePresets} onChange={onRangeChange} style={{ borderColor: '#C6C6C6'}}/>
              </Space>
            </div>
          </div>
          <button className="recordList_filterBar-btn">輸出</button>
        </div>
        <div className="recordList_list">
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
        </div>
      </div>
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
        <div className="userInfo_analyze">
          <div className="userInfo_analyze-data">
            <div className="container">
              <div className="subtitle">最大交易回落：</div>
              <div className="content">15.4%</div>
            </div>
            <div className="container">
              <div className="subtitle">時間：</div>
              <div className="content">32個月</div>
            </div>
            <div className="container">
              <div className="subtitle">交易筆數：</div>
              <div className="content">132筆</div>
            </div>
            <div className="container">
              <div className="subtitle">每筆交易損益：</div>
              <div className="content">+4012</div>
            </div>
          </div>
          <hr />
          <div className="img-container">
            <img src="/img/MDD.png" alt="" />
          </div>
        </div>
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