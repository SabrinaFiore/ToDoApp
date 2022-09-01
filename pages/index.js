import * as React from 'react';
import { Container, GlobalStyles } from '@mui/material';
import TableList from '../components/TableList';

const Home = () => {
  const { state: {items} = [], dispatch } = useAppContext()

  return (
    <Container maxWidth="lg">
      <GlobalStyles styles={{ p: { color: 'dark-grey', padding: '0.5rem 0', fontWeight: 500, fontSize: '25px' } }} />
      <p>To Do App</p>
      <TableList></TableList>
    </Container>
  )
}

export default Home;
