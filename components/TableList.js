import * as React from 'react';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box,Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import SubTable from './SubTableList';
import { useAppContext } from '../contexts/TableContext';

const TableList = () => {
  const [showRow, setShowRow] = useState("");
  const [todoItem, setTodoItem] = useState("");
  const [disableBtn, setDisableBtn] = useState("");
  const [items, setItems] = useState([]);
  const { state, dispatch } = useAppContext()
  
  // ADD ITEMS
  const handleAdd = e => {
    let dt = new Date().toLocaleString();
    dispatch({ type: 'Add', value: items });

    setTodoItem("");
    setShowRow(true);
    setItems([ 
      {
        id: uuidv4(),
        message: todoItem,
        date: new Date().toLocaleString("en-US"),
        button: 'delete',
        displayRow: true,
      },
      ...items, 
    ])

    items.map((item) => {
      if (item.message === todoItem) {
        // I don't know thy setDisableBtn doesn't change state
        setDisableBtn(true)
        item.displayRow = false;
        setItems([ 
          {
            id: item.id,
            message: item.message,
            date: item.date,
            button: 'delete',
            displayRow: true,
          },
          ...items
        ])
        items.sort((_a, _b) => dt > item.date ? -1: 1)
      }
      if (item.message !== todoItem) {
        setDisableBtn(false)
      }
    })
  };

  const handleToggle = (id) => {
    const _items = items.map((item) => {
      const copy = [...items];
      let index = copy.indexOf(item, 0)
      
      if (item.id === id) {
        // setShowRow(false)
        item.displayRow = false;
        copy.splice(index, 1);
        dispatch({ type: 'Delete', value: copy });
      }
      return item;
    })

    setItems(_items)
  };

  return (
    <>
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
						onClick={handleAdd}
						variant="text"
						color="success"
						size="small"
						disabled={disableBtn === true || !todoItem}
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
							{items.map(({ id, message, date, button, displayRow }) => (displayRow === true && showRow === true &&
								<TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell sx={{ borderBottom: 'unset' }}>{message}</TableCell>
									<TableCell sx={{ borderBottom: 'unset' }}><b>{date}</b></TableCell>
									<SubTable></SubTable>
									<TableCell sx={{ borderBottom: 'unset' }}>
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
		</>
  );   
}

export default TableList;