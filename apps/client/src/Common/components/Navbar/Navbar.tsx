import { AppBar, Toolbar, Typography } from '@mui/material';

export default function CommonNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
