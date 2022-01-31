import { render, screen, within } from '@testing-library/react';
import todoItemsFixture from 'Todo/fixtures/items';
import TodoCard from '.';

// test data
const mockItem = todoItemsFixture[0];

//
// integration test
//
test('TodoCard', () => {
  render(<TodoCard item={mockItem} />);
  const card = screen.getByTestId('TodoCard');
  expect(card.getAttribute('id')).toBe(mockItem.id);
  within(card).getByText(mockItem.label);
  const checkbox = within(card).getByRole('checkbox') as HTMLInputElement;
  expect(checkbox.checked).toBe(true);
});
