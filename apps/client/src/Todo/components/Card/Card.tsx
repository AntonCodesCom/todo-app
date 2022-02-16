import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { ElementType } from 'react';
import TodoItem from 'Todo/interfaces/item';
import useTodoItemUpdate from 'Todo/mutations/use-item-update';

interface TodoCardProps {
  item: TodoItem;
  component?: ElementType;
}

export default function TodoCard({ item, component = 'li' }: TodoCardProps) {
  const [update, { loading, error }] = useTodoItemUpdate();
  const color = error ? 'error' : 'textPrimary';
  const { id, label, done } = item;

  function handleChange() {
    update(id, { done: !done });
  }

  return (
    <Box component={component} data-testid="TodoCard" id={id}>
      <FormControlLabel
        control={<Checkbox checked={done} onChange={handleChange} />}
        label={<Typography color={color}>{label}</Typography>}
        disabled={loading}
      />
    </Box>
  );
}
