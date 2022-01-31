import { render, screen } from '@testing-library/react';
import commonHash from 'Common/utils/hash';
import todoItemsFixture from 'Todo/fixtures/items';
import useTodoItems from 'Todo/queries/use-items';
import TodoMain from './Main';

// mocking query hook
jest.mock('Todo/queries/use-items');

// test data
const mockItems = todoItemsFixture;

//
// integration test
//
describe('TodoMain', () => {
  test('on success', () => {
    (useTodoItems as jest.Mock).mockReturnValue({
      loading: false,
      data: mockItems,
    });
    render(<TodoMain />);
    const list = screen.getByRole('list', { name: /my todos/i });
    expect(list.getAttribute('data-hash')).toBe(commonHash(mockItems));
  });

  test('on empty', () => {
    (useTodoItems as jest.Mock).mockReturnValue({
      loading: false,
      data: [],
    });
    render(<TodoMain />);
    screen.getByText(/no todos yet/i);
  });

  test('on error', () => {
    (useTodoItems as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('Test error.'),
    });
    render(<TodoMain />);
    screen.getByTestId('TodoErrorView');
  });

  test('on loading', () => {
    (useTodoItems as jest.Mock).mockReturnValue({
      loading: true,
    });
    render(<TodoMain />);
    screen.getByTestId('TodoLoading');
  });
});
