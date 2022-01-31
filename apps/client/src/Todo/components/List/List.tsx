import commonHash from 'Common/utils/hash';
import TodoItem from 'Todo/interfaces/item';
import TodoCard from '../Card';

interface TodoListProps {
  items: TodoItem[];
  labelledBy?: string;
}

export default function TodoList({ items, labelledBy }: TodoListProps) {
  return (
    <ul
      aria-labelledby={labelledBy}
      data-hash={commonHash(items)}
      style={{ listStyle: 'none', margin: 0, padding: 0 }}
    >
      {items.map((x, i) => (
        <TodoCard key={i} item={x} />
      ))}
    </ul>
  );
}
