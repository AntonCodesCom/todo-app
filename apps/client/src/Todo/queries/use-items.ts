import CommonQueryResult from 'Common/interfaces/query-result';
import { useSelector } from 'react-redux';
import TodoItem from 'Todo/interfaces/item';
import { todoErrorSelect, todoItemsSelect } from 'Todo/store/selectors';

export default function useTodoItems(): CommonQueryResult<TodoItem[]> {
  const data = useSelector(todoItemsSelect);
  const error = useSelector(todoErrorSelect);
  const loading = !data;
  return { loading, error, data };
}
