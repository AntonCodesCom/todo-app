import { render, screen, within } from '@testing-library/react';
import CommonQueryResult from 'Common/interfaces/query-result';
import todoItemsFixture from 'Todo/fixtures/items';
import TodoItem from 'Todo/interfaces/item';
import useTodoItemUpdate from 'Todo/mutations/use-item-update';
import TodoCard from './Card';

// mocking mutation hook
jest.mock('Todo/mutations/use-item-update');

// test data
const mockItem = todoItemsFixture[0];
const mockQueryResult: CommonQueryResult<TodoItem> = {
  loading: false,
};

//
// integration test
//
describe('TodoCard', () => {
  it('should display the `item` properties correctly', () => {
    (useTodoItemUpdate as jest.Mock).mockReturnValue([() => {}, {}]);
    render(<TodoCard item={mockItem} />);
    const card = screen.getByTestId('TodoCard');
    expect(card.getAttribute('id')).toBe(mockItem.id);
    within(card).getByText(mockItem.label);
    const checkbox = within(card).getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(mockItem.done);
  });

  it('should trigger the mutate function on checkbox click', () => {
    const mutateFnSpy = jest.fn();
    (useTodoItemUpdate as jest.Mock).mockReturnValue([mutateFnSpy, {}]);
    render(<TodoCard item={mockItem} />);
    const card = screen.getByTestId('TodoCard');
    const checkbox = within(card).getByRole('checkbox') as HTMLInputElement;
    checkbox.click();
    expect(mutateFnSpy).toHaveBeenCalledWith(mockItem.id, {
      done: !checkbox.checked,
    });
  });

  // TODO: remove when todo list reactive variable is implemented
  it('should set checkbox state due to `data`', () => {
    const mockDone = false;
    (useTodoItemUpdate as jest.Mock).mockReturnValue([
      () => {},
      {
        ...mockQueryResult,
        data: {
          ...mockItem,
          done: mockDone,
        },
      },
    ]);
    render(<TodoCard item={mockItem} />);
    const card = screen.getByTestId('TodoCard');
    const checkbox = within(card).getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(mockDone);
  });

  it('should be disabled on `loading`', () => {
    (useTodoItemUpdate as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: true,
      },
    ]);
    render(<TodoCard item={mockItem} />);
    const card = screen.getByTestId('TodoCard');
    const checkbox = within(card).getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });
});
