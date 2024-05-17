import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import axios from 'axios';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useEffect } from 'react';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Collapse } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


export default function ListMyBooks() {
  const { useState } = React;
  const [rows,setRows] =  React.useState([]);

  useEffect(() => {
    let userid = window.sessionStorage.getItem("userid");

    axios.get(`http://localhost:3002/${userid}/received-requests`)
    .then(function (response) {
      if(response.data.message === "No available books match the search criteria"){
        setRows([])
      }
      else{
        console.log("then ",response);
        setRows(response.data)
      
      }
      })
    .catch(function (error) {
      console.log(error);
    });

  }, []);
  
const handleClickToOpen = (rowdata) => {


}
  const [columns, setColumns] = useState([
    { title: 'title', field: 'title' },
    { title: 'author', field: 'author' },
    { title: 'genre', field: 'genre' },
    { title: 'availability_status', field: 'availability_status' },
    
  ]);

  const [data, setData] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ]);


  
  const addBook = (rowdata) => {
    let userid = window.sessionStorage.getItem("userid");

    axios.post(`http://localhost:3002/${userid}/add-book`, {
      "title" : rowdata.title,
      "author" : rowdata.author,
      "genre" : rowdata.genre
  })
    .then(function (response) {
        setAlertOpen(true)
        setSevstatus("success")
        setAlertmessage("Book added successfully")
      console.log("then ",response);
      setAlertOpen(true)
    })
    .catch(function (error) {
      console.log(error);
      setAlertOpen(true)
      setSevstatus("error")
      setAlertmessage("Unable to add the book ,A book with the same title and lender ID already exists")
    });
  
  };

  
  const processRequest = (rowdata, statusofRequest) => {
    let userid = window.sessionStorage.getItem("userid");

    axios.put(`http://localhost:3002/${userid}/update-request-and-book-status`, {
      status: statusofRequest,
      book_id: rowdata.id,
    })
    .then(function (response) {
        setAlertOpen(true)
        setSevstatus("success")
        setAlertmessage("Request Updated successfully")

        console.log("then ",response);
      setAlertOpen(true)
    })
    .catch(function (error) {
      console.log(error);
      setAlertOpen(true)
      setSevstatus("error")
      setAlertmessage("Error while updating exchange request")
    });
  
  };

  const [sevstatus, setSevstatus] = useState("success")
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertmessage, setAlertmessage] = useState("Exchange Request created successfully")
  
  return (
    <div>
      
      { alertOpen && 
      <Alert severity={sevstatus} onClose={() => {setAlertOpen(false)}}>
      {alertmessage}
      </Alert>

      }

    <MaterialTable
      title="Exchange Books"
      icons={tableIcons}
      columns={columns}
      data={rows}
      options={{
        actionsColumnIndex: -1
      }}
      actions={[
        {
          icon:()=> {
            return <ClearIcon style={{width:'18px', height:'18px'}} />
          },
          tooltip: 'Decline',
          onClick: (event,rowData) => {
            alert(JSON.stringify(rowData))
            processRequest(rowData , "Declined")
          },
          isFreeAction: false
          },
          {
            icon:()=> {
              return <DoneIcon style={{width:'18px', height:'18px'}} />
            },
            tooltip: 'Accept',
            onClick: (event,rowData) => {
              alert(JSON.stringify(rowData))
              processRequest(rowData , "Accepted")
            },
            isFreeAction: false
            }
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setRows([...rows, newData]);
              addBook(newData)
              resolve();
            }, 1000)
          }),

      }}
    />
    </div>
  )
}
