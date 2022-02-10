import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { ElementType, useEffect, useState } from 'react';
import TodoItem from 'Todo/interfaces/item';
import useTodoItemUpdate from 'Todo/mutations/use-item-update';

interface TodoCardProps {
  item: TodoItem;
  component?: ElementType;
}

export default function TodoCard({ item, component = 'li' }: TodoCardProps) {
  const [done, setDone] = useState(item.done);
  const [update, { loading, error, data }] = useTodoItemUpdate();
  const color = error ? 'error' : 'textPrimary';

  useEffect(() => {
    !error && data && setDone(data.done);
  }, [data, error]);

  function handleChange() {
    update(item.id, { done: !done });
  }

  return (
    <Box component={component} data-testid="TodoCard" id={item.id}>
      <FormControlLabel
        control={<Checkbox checked={done} onChange={handleChange} />}
        label={<Typography color={color}>{item.label}</Typography>}
        disabled={loading}
      />
    </Box>
  );
}
