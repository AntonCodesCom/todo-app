import { Box, Container } from '@mui/material';
import CommonNavbar from 'Common/components/Navbar';
import TodoMain from 'Todo';

export default function App() {
  return (
    <>
      <CommonNavbar />
      <Box mb={6} />
      <Container component="main" fixed>
        <TodoMain />
      </Container>
    </>
  );
}
