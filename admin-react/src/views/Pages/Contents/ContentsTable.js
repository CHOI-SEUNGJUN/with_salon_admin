import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table';

import { Button } from 'reactstrap';
import axios from 'axios';

import "./index.css";

const conn = require("../../../config/connection");
const BaseURL = conn.BaseURL;

const GetContentsListEndPoint = BaseURL + "api/v1/contents/";
const DeleteContentEndPoint = BaseURL + "api/v1/contents/delete";

let newLists;
let headerName;

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
    table-layout: fixed
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

  const deleteContent = async (req) => {
    const callApi = async () => {
      let idx = {idx: req}
      console.log(idx)
      const { data: res } = await axios.post(DeleteContentEndPoint, idx);
      return res;
    };

    callApi()
      .then((res) => {
        alert('적용은 되었지만 새로고침을 하셈')
      })
      .catch((err) => {
        alert('에러가 났음')
        console.log(err);
      });
  };


  const getButtonColor = (r) => {
    return 'danger'
  }

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
                if ( cell.column.id === "delete") {

                  return <td {...cell.getCellProps()}>
                    <Button color={getButtonColor()} onClick={() => deleteContent(row.original.idx)}>삭제</Button>
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

function ContentsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: `컨텐츠 정보`,
        columns: [
          // {
          //   Header: 'ID',
          //   id: 'idx',
          //   accessor: 'idx',
          // },
          {
            Header: "페이지 번호",
            accessor: "pageNum",
          },
          // {
          //   Header: "카테고리",
          //   accessor: "category",
          // },
          {
            Header: "컨텐츠 이미지 주소",
            accessor: "contentImage",
          },
          {
            Header: "질문 이미지 주소",
            accessor: "questionImage",
          },
          {
            Header: "질문 내용",
            accessor: "questionContent",
          },
          {
            Header: "팝업 이미지 주소",
            accessor: "popupImage",
          },
          {
            Header: "팝업 메세지",
            accessor: "popupMessage",
          },
          {
            Header: "삭제",
            accessor: "delete"
          }
        ],
      },
    ],
    []
  )


  const [listItems, setListItems] = useState([]);
  const [isUpdated, setIsUpdated] = useState(0);

  const fetchContentsList = async () => {
    const callApi = async () => {
      let get_conf = {
        headers: {
          token: "2ndMVPsecretToken",
        },
      };
      const { data: contentsList } = await axios.get(GetContentsListEndPoint, get_conf);
      console.log("contents:", contentsList)
      console.log("data:", contentsList.data)
      return { contentsList };
    };

    callApi()
      .then((res) => {
        console.log(res.contentsList.data);

        newLists = res.contentsList.data;

        // newLists = res.contentsList.data.map((d) => {
        //   switch (d.category) {
        //     case 1: return d.category = '사랑'
        //     case 2: return d.category = '인간관계'
        //     case 3: return d.category = '인생'
        //     case 4: return d.category = '행복'
        //   }
        // })

        let filtered;
        headerName = "사랑" // 최초 선언

        filtered = res.contentsList.data.filter((d) => {
          return d.category === 1
        }).sort((a, b) => b.pageNum - a.pageNum)

        // filtered.map((d) => {
        //   switch (d.category) {
        //     case 1: return d.category = '사랑'
        //     case 2: return d.category = '인간관계'
        //     case 3: return d.category = '인생'
        //     case 4: return d.category = '행복'
        //   }
        // })
        
        setListItems(filtered)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterList = async (num, header) => {
    let filtered;
    filtered = newLists.filter((d) => {
      return d.category === num
    }).sort((a, b) => b.pageNum - a.pageNum);

    headerName = header;

    setListItems(filtered)
  }


  useEffect(() => {
    fetchContentsList();
  }, []);

  // useEffect(() => {
  //  addRow();

  // }, [props.isDashboardUpdated, props.newOrder]);

  const addRow = () => {
    const addContentsList = async () => {
      let newSalons = await listItems.map(d => ({...d}));

      newSalons.push(props.newSalon);
      await setListItems(newSalons);
      
      setIsUpdated(isUpdated+1);
      console.log("isUpdated:",isUpdated);
    }

    addContentsList();
  }

  return (
    <>
    <strong><b style={{margin: 10}}>현재 선택된 카테고리 : {headerName}</b></strong>
    <Button id="filter" onClick={() => {filterList(1, "사랑")}}>사랑</Button>
    <Button id="filter" onClick={() => {filterList(2, "인간관계")}}>인간관계</Button>
    <Button id="filter" onClick={() => {filterList(3, "인생")}}>인생</Button>
    <Button id="filter" onClick={() => {filterList(4, "행복")}}>행복</Button>
    <Button id="filter" onClick={() => {filterList(-1, "아이폰용")}}>아이폰용</Button>
      <Styles>
        <Table columns={columns} data={listItems} />
      </Styles>
    </>
  )
}


export default ContentsTable;