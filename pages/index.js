import * as React from 'react';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Container, GlobalStyles, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import SubTable from '../components/SubTable';

const Home = () => {
  const [showRow, setShowRow] = useState("");
  const [todoItem, setTodoItem] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [items, setItems] = useState([{ id: '0', message: '', date: '', button: '', displayRow: false}]);

  useEffect(() => {
    window.localStorage.setItem('sf_toDoList', JSON.stringify(items))
    window.localStorage.clear();
  }, [items])

  useEffect(() => {
    const data = window.localStorage.getItem('sf_toDoList')
    console.log("data LOCALSTORAGE BEFORE",JSON.parse(data))
    if (data) {
      console.log("data LOCALSTORAGE AFTER",JSON.parse(data))
      setItems(JSON.parse(data))
    }
  }, [])
  
  // ADD ITEMS
  const handleAdd = () => {
    setTodoItem("");
    setShowRow(true);

    setItems([
      ...items, 
      {
        id: uuidv4(),
        message: todoItem,
        date: new Date().toLocaleString("en-US"),
        button: 'delete',
        displayRow: true,
      }
    ])

    items.map((item) => {
      if (item.message === todoItem) {
        console.log("item.message", item.message)
        console.log("todoItem", todoItem)
        setDisableButton(true)
        item.displayRow = false;
      }
      if (item.message !== todoItem) {
        setDisableButton(false)
      }
    })
  };

  const handleToggle = (id) => {
    const _items = items.map((item) => {
      setShowRow(false)
      const copy = [...items];
      let index = copy.indexOf(item, 0)
      console.log("index", index)
      if (item.id === id) {
        item.displayRow = false;
        console.log("item", index)
        return copy.splice(index, 0);
      }
      return item;
    })

    setItems(_items)
  };

  return (
    <Container maxWidth="lg">
      <GlobalStyles styles={{ p: { color: 'dark-grey', padding: '0.5rem 0', fontWeight: 500, fontSize: '25px' } }} />
      <p>To Do App</p>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={20} sx={{ mb: 1 }}>
        <TextField 
          type="text" 
          value={todoItem} 
          onChange={(e) => setTodoItem(e.target.value)}
          id="standard-basic" label="Add Items" 
          variant="standard" />
          <Button 
            type="button" 
            onClick={() => handleAdd(todoItem)}
            variant="text"
            color="success"
            size="small"
            disabled={disableButton === true || !todoItem}
          >Add</Button>
      </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Insertion date</TableCell>
              <TableCell sx={{ paddingLeft: 0 }}>Add Details</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({id, message, date, button, displayRow}) => ( displayRow === true && showRow === true &&
              <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                  <TableCell sx={{borderBottom: 'unset'}}>{message}</TableCell>
                  <TableCell sx={{borderBottom: 'unset'}}><b>{date}</b></TableCell>
                  <SubTable></SubTable>
                  <TableCell sx={{borderBottom: 'unset'}}>
                    <Button
                      type="button"
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleToggle(id)}
                    >{button}</Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Home;
