import { render, screen } from '@testing-library/react';
import commonHash from 'Common/utils/hash';
import todoItemsFixture from 'Todo/fixtures/items';
import TodoList from './List';

// test data
const mockItems = todoItemsFixture;

//
// integration test
//
test('TodoList', () => {
  render(<TodoList items={mockItems} />);
  const list = screen.getByRole('list');
  expect(list.getAttribute('data-hash')).toBe(commonHash(mockItems));
});
