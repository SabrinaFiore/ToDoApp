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

const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const [addDetailItem, setTaddDetailItem] = useState([
    {
      id: '0',
      message: 'Red Color',
      done: false,
    },
  ]);

  const [items, setItems] = useState([
    {
      id: '1234',
      message: 'Buy Milk',
      done: false,
      date: new Date().toLocaleString("en-US"),
    },
  ]);

  // ADD ITEMS
  const handleAdd = () => {
    if(todoItem) {
      setItems([{
        id: uuidv4(),
        message: todoItem,
        done: false,
        date: new Date().toLocaleString("en-US"),
      },  
      ...items]);
      setTodoItem("");
    }
  };

  const handleToggle = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: item.done === false ? true : false
        };
      }
      console.log(item.done)
      return item;
    })

    setItems(_items);
    console.log("ENTRA")
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
            <TableBody>
              {items.map(({id, message, date, done, time}) => ( 
                  <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{message}</TableCell>
                    <TableCell>Insertion date <b>{date}</b></TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        size="small"
                        className={(done === true ? 'done' : '')}
                      >Delete</Button>
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