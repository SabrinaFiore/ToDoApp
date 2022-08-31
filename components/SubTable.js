import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const SubTable = () => {
	const [todoItemDetail, setTodoItemDetail] = useState("");
  const [itemsDetails, setItemsDetails] = useState([{ id: '0', message: '', displayDetailRow: false}]);

	// ADD ITEMS DETAILS
	const handleAddDetails = () => {
		setTodoItemDetail("");

		setItemsDetails([
			...itemsDetails, 
			{
				id: uuidv4(),
				message: todoItemDetail,
				displayDetailRow: true
			}
		])
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stack direction="row" spacing={10} sx={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{display: 'flex'}}>
					<TextField 
						type="text" 
						value={todoItemDetail} 
						onChange={(e) => setTodoItemDetail(e.target.value)}
						id="standard-basic" label="Add Details" 
						variant="standard" />
					<Button 
						type="button" 
						variant="text"
						color="success"
						size="small"
						onClick={handleAddDetails} 
						disabled={!todoItemDetail}
					>Add</Button>
				</div>
				<TableBody sx={{ marginLeft: 0 }}>
					{itemsDetails.map(({id, message, displayDetailRow}) => ( displayDetailRow === true && 
						<TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell sx={{ paddingLeft: 0 }}>{message}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Stack>
		</Box>
	)
}

export default SubTable;
