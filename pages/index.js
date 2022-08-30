import * as React from 'react';
import { useState } from "react";
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

const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([
    {
      id: '1',
      message: 'Buy Dress',
      date: new Date().toLocaleString("en-US"),
      button: 'delete',
      displayRow: true,
      detail: [
        {
          id: '1',
          color: 'petrol green',
          button: 'Add'
        }
      ]
    },
  ]);

  // ADD ITEMS
  const handleAdd = () => {
    if(todoItem) {
      setItems([{
        id: uuidv4(),
        message: todoItem,
        date: new Date().toLocaleString("en-US"),
        button: 'delete',
        displayRow: true,
        detail: [
          {
            id: uuidv4(),
            color: 'petrol green',
            button: 'Add'
          }
        ]
      },   
      ...items]);
      setTodoItem("");
    }
  };

  const handleToggle = (id) => {
    const _items = items.map((item) => {
      const copy = [...items];
      let index = copy.indexOf(item, 0)
      if (item.id === id) {
        item.displayRow = false;
        console.log("item", index)
        return copy.splice(index, 1);
      }
      return item;
    })

    setItems(_items);
  };


  // ADD ITEMS DETAILS

  return (
    <div>
      <Container maxWidth="lg">
        <GlobalStyles styles={{ p: { color: 'dark-grey', padding: '0.5rem 0', fontWeight: 500, fontSize: '25px' } }} />
        <p>To Do App</p>
        <Box sx={{ width: '100%' }}>
          <Stack direction="row" spacing={20} sx={{ mb: 1 }}>
            <TextField 
              type="text" 
              value={todoItem} 
              onChange={(e) => setTodoItem(e.target.value)}
              id="standard-basic" label="Standard" 
              variant="standard" />
              <Button 
                type="button" 
                onClick={handleAdd} 
                variant="text"
                color="success"
                size="small"
              >Add</Button>
          </Stack>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Insertion date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(({id, message, date, button, displayRow}) => ( 
                displayRow === true &&
                <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{message}</TableCell>
                  <TableCell><b>{date}</b></TableCell>
                  <TableCell>
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
    </div>
  )
}

export default Home;