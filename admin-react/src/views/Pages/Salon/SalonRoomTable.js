import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table';
import * as firebase from 'firebase/app';
import 'firebase/database';
import FirebaseConfig from '../../../config/firebase.config';

import { Button } from 'reactstrap';
import axios from 'axios';

import "./index.css";

const conn = require("../../../config/connection");
const BaseURL = conn.BaseURL;

let dataBase;
let getFirebase;

const GetSalonListEndPoint = BaseURL + "api/v1/salon/";

const Styles = styled.div`
table {
  position: relative;

  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    text-align: center;
  }
  thead {
    overflow-y: scroll;
  }
  tbody {
    display: block;
    overflow: auto;
    table-layout: fixed;
    max-height: 620px;
  }
  
  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
}
`


function Table( {columns, data} ) {
  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })


  return(
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr  {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.slice(0).reverse().map((row, rowIndex) => {
          prepareRow(row)
          let odd = "rt-tr -even";
          if ( rowIndex%2 ){
            odd = "rt-tr -odd";
          }
          return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                if ( cell.column.id === "curPage") {

                return <td {...cell.getCellProps()}>
                  <font color='red'>{cell.render('Cell')}</font>
                  </td>;
                } else {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }
                })}
              </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function SalonRoomTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: '살롱 룸 정보',
        columns: [
          // {
          //   Header: 'ID',
          //   id: 'idx',
          //   accessor: 'idx',
          // },
          {
            Header: '룸 이름(고유코드)',
            id: 'roomName',
            accessor: 'roomName',
          },
          {
            Header: "비밀번호",
            accessor: "password",
          },
          {
            Header: "카테고리",
            accessor: "category",
          },
          {
            Header: "현재 페이지",
            accessor: "curPage",
          },
          {
            Header: "살롱 날짜",
            accessor: "progressDate",
          },
        ],
      },
    ],
    []
  )

  getFirebase = (roomName) => {
    dataBase.ref(`/room/${roomName}`).on('value', (snapshot) => {
      if (snapshot.exists()) {
        let value = snapshot.val().curPage
        let idx;
      
        idx = listItems.findIndex((item, idx) => {
          return item.roomName === roomName
        })
        
        let newIdv = idv;
        newIdv.id = idx;
        newIdv.v = value;
        
        setIdv({
          id: newIdv.id,
          v: newIdv.v
        })

        
        return value
      } else {
        return ""
      }
      
    });
  }

  const [listItems, setListItems] = useState([]);
  const [isUpdated, setIsUpdated] = useState(0);
  const [idv, setIdv] = useState({
    id: 0,
    v: 0
  })

  useEffect(() => {
    if (idv.id != 0 || idv.v != 0) {
      let newListItems = listItems.map(d=>({...d}));
      newListItems[idv.id].curPage = idv.v;
      setListItems(newListItems);
    }

    
    
  }, [idv])


  const fetchSalonList = async () => {
    const callApi = async () => {
      let get_conf = {
        headers: {
          token: "2ndMVPsecretToken",
        },
      };
      const { data: salonList } = await axios.get(GetSalonListEndPoint, get_conf);
      console.log("data:", salonList.data)
      return { salonList };
    };


    callApi()
      .then(async (res) => {
        let forfor = res.salonList.data;

        forfor.map ((item, index) => {
          if (item.category == 1) { forfor[index].category = "사랑" }
          else if (item.category == 2) forfor[index].category =  "인간관계"
          else if (item.category == 3) forfor[index].category =  "인생"
          else if (item.category == 4) forfor[index].category =  "행복"
          else if (item.category == -1) forfor[index].category =  "아이폰"
        })
        console.log(forfor)

        for (var item in forfor) {
          forfor[item].curPage = "";
          if (item == forfor.length-1) {
            console.log("**END**")
            setListItems(forfor);
          }
        }
      
        for (var item in forfor) {
          const curPage =  getFirebase(forfor[item].roomName)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todaySearch = () => {
    function replaceAll(str, searchStr, replaceStr) {
      return str.split(searchStr).join(replaceStr);
    }
    
  
    const event = new Date();
  
    const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
    
    let exValue = event.toLocaleDateString('ko-KR', options)
  
    exValue = replaceAll(exValue, ".", "-")
    exValue = replaceAll(exValue, " ", "")
    exValue = exValue.substring(0, exValue.lastIndexOf("-"))
    
  
    console.log(exValue);

    let a = Array()

    listItems.map((item, index) => {
      if (item.progressDate == exValue) {
        console.log(listItems[index])
          a.push(listItems[index])
      }
    })

    if (a.length > 0) {
      setListItems(a)
    } else {
      alert("오늘 살롱 없음")
    }
  }




  useEffect(() => {
    firebase.initializeApp(FirebaseConfig);
    dataBase = firebase.database();

    fetchSalonList();
  }, []);

  return (
    <>
    <strong><b style={{margin: 10}}>사랑=1, 인간관계=2, 인생=3, 행복=4</b></strong>
    <br/><Button onClick={() => todaySearch()} color="primary" style={{margin: 10}}>오늘 진행되는 살롱 보기</Button>
    <Button onClick={() => fetchSalonList()} color="primary" style={{margin: 10}}>전체 살롱 보기</Button>
      <Styles>
        <Table columns={columns} data={listItems} />
      </Styles>
    </>
  )
}


export default SalonRoomTable;