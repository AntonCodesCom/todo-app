import { Checkbox, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import { ElementType } from 'react';
import TodoItem from 'Todo/interfaces/item';

interface TodoCardProps {
  item: TodoItem;
  component?: ElementType;
}

export default function TodoCard({ item, component = 'li' }: TodoCardProps) {
  return (
    <Box component={component} data-testid="TodoCard" id={item.id}>
      <FormControlLabel
        control={<Checkbox defaultChecked={item.done} />}
        label={item.label}
      />
    </Box>
  );
}
