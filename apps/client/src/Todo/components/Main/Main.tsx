import { Box, Typography } from '@mui/material';
import useTodoItems from 'Todo/queries/use-items';
import TodoErrorView from '../ErrorView';
import TodoList from '../List';
import { TodoLoading } from '../Loading';

export default function TodoMain() {
  const htmlId = 'TodoMain-h1';
  const { loading, error, data: todos } = useTodoItems();

  if (loading) {
    return <TodoLoading />;
  }

  if (error) {
    return <TodoErrorView />;
  }

  return (
    <>
      <Typography id={htmlId} component="h1" variant="h2">
        My todos
      </Typography>
      <Box mb={6} />
      {todos && todos.length > 0 ? (
        <TodoList items={todos} labelledBy={htmlId} />
      ) : (
        <Typography>No todos yet.</Typography>
      )}
    </>
  );
}
