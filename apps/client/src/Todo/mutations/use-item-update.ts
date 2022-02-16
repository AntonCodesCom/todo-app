import TodoDto from '@antoncodes/server/src/todo/todo.dto';
import CommonMutationResult from 'Common/interfaces/mutation-result';
import commonFetch from 'Common/utils/fetch';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoItem, {
  todoItemFromDto,
  todoItemInit,
  TodoItemUpdate,
} from 'Todo/interfaces/item';
import { todoUpdateItem } from 'Todo/store/actions';

//
// dev mutation
//
// TODO: invent something to get rid of the `dispatch` stuff duplication
// in both queries
//
/* eslint-disable */
function useTodoItemUpdateDev(): CommonMutationResult<
  [string, TodoItemUpdate],
  TodoItem
> {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  function update(id: string, { done }: TodoItemUpdate) {
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      const simulateError = false;
      if (simulateError) {
        setError(new Error('Test error.'));
      } else {
        const item = todoItemInit({
          id,
          done,
        });
        dispatch(todoUpdateItem(item));
      }
      setLoading(false);
    }, 1000);
  }

  return [update, { loading, error }];
}
/* eslint-enable */

//
// prod mutation
//
function useTodoItemUpdateProd(): CommonMutationResult<
  [string, TodoItemUpdate],
  TodoItem
> {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  async function update(id: string, itemUpdate: TodoItemUpdate) {
    setLoading(true);
    try {
      const res = await commonFetch(`/todo/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(itemUpdate),
      });
      const json = await res.json();
      const dto = json.data as TodoDto;
      const item = todoItemFromDto(dto);
      dispatch(todoUpdateItem(item));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return [update, { loading, error }];
}

// const useTodoItemUpdate = useTodoItemUpdateDev;
const useTodoItemUpdate = useTodoItemUpdateProd;

export default useTodoItemUpdate;
