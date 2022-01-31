import { Box, CircularProgress } from '@mui/material';

export default function TodoLoading() {
  return (
    <Box data-testid="TodoLoading" textAlign="center">
      <CircularProgress />
    </Box>
  );
}
