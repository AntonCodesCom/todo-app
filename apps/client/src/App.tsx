import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mb={6} />
      <Container component="main" fixed>
        <Typography component="h1" variant="h2">My todos</Typography>
      </Container>
    </div>
  );
}
