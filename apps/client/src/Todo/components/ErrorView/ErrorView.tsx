import { Box, Typography } from '@mui/material';

export default function TodoErrorView() {
  return (
    <Box data-testid="TodoErrorView" textAlign="center">
      <Typography color="error">An error occurred.</Typography>
    </Box>
  );
}
