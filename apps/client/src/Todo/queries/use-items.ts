import CommonQueryResult from 'Common/interfaces/query-result';
import commonFetch from 'Common/utils/fetch';
import { useEffect, useState } from 'react';
import todoItemsFixture from 'Todo/fixtures/items';
import TodoItem from 'Todo/interfaces/item';

/* eslint-disable */
function useTodoItemsDev(): CommonQueryResult<TodoItem[]> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<TodoItem[]>();

  useEffect(() => {
    setTimeout(() => {
      setData(todoItemsFixture);
      // setError(new Error('Test error.'));
      setLoading(false);
    }, 1000);
  }, []);

  return { loading, error, data };
}
/* eslint-enable */

function useTodoItemsProd(): CommonQueryResult<TodoItem[]> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<TodoItem[]>();

  useEffect(() => {
    commonFetch('/todo')
      .then((res) => res.json())
      .then((data) => setData(data.data as TodoItem[]))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, data };
}

// const useTodoItems = useTodoItemsDev;
const useTodoItems = useTodoItemsProd;

export default useTodoItems;
