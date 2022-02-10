import CommonMutationResult from 'Common/interfaces/mutation-result';
import commonFetch from 'Common/utils/fetch';
import { useState } from 'react';
import TodoItem, { todoItemInit, TodoItemUpdate } from 'Todo/interfaces/item';

/* eslint-disable */
function useTodoItemUpdateDev(): CommonMutationResult<
  [string, TodoItemUpdate],
  TodoItem
> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<TodoItem>();
  function update(id: string, { done }: TodoItemUpdate) {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    setTimeout(() => {
      setData(
        todoItemInit({
          done,
        })
      );
      // setError(new Error('Test error.'));
      setLoading(false);
    }, 1000);
  }

  return [update, { loading, error, data }];
}
/* eslint-enable */

function useTodoItemUpdateProd(): CommonMutationResult<
  [string, TodoItemUpdate],
  TodoItem
> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<TodoItem>();

  function update(id: string, itemUpdate: TodoItemUpdate) {
    setLoading(true);
    commonFetch(`/todo/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(itemUpdate),
    })
      .then((res) => res.json())
      .then((data) => setData(data.data as TodoItem))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  return [update, { loading, error, data }];
}

// const useTodoItemUpdate = useTodoItemUpdateDev;
const useTodoItemUpdate = useTodoItemUpdateProd;

export default useTodoItemUpdate;
