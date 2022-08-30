import * as React from 'react';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListItem';

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
      date: new Date().toDateString()
    },
  ]);

  // ADD ITEMS
  const handleAdd = () => {
    if(todoItem) {
      setItems([
      {
        id: uuidv4(),
        message: todoItem,
        done: false,
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
      <h1>To Do App</h1>
      <div>
        <input 
          type="text" 
          value={todoItem} 
          onChange={(e) => setTodoItem(e.target.value)}/>

        <Button type="button" 
          onClick={handleAdd} 
          variant="outlined"
          color="success"
          size="small"
        >Add</Button>
      </div>
      
      <section>
        <List 
          sx={{  bgcolor: 'background.paper' }}
          aria-label="list">
          {items.map(({id, message, date, done}) => ( 
            <ListItem key={id} onClick={() => handleToggle(id)}>{message}
              <p>Insertion date {date} </p>
              {/* className={(done === true ? 'done' : '')} */}
              <Button 
                type="button" 
                variant="outlined" 
                color="error"
                size="small"
                className={(done === true ? 'done' : '')}
              >Delete</Button>

              <section>
                <ListSubheader>
                  <input type="text" placeholder="Add Details"/>
                  <Button type="button" 
                    variant="outlined"
                    color="success"
                    size="small"
                  >Add</Button>
                </ListSubheader>
              </section>
            </ListItem>
          ))}
        </List>
      </section>
    </div>
  )
}

export default Home;