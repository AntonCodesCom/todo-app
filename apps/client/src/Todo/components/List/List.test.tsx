import { render, screen, within } from '@testing-library/react';
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
  const cards = within(list).getAllByRole('listitem');
  const cardIds = cards.map((x) => x.getAttribute('id'));
  const itemIds = mockItems.map((x) => x.id);
  expect(cardIds.sort()).toStrictEqual(itemIds.sort());
});
