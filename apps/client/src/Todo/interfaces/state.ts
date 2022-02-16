import TodoItem from './item';

export default interface TodoState {
  items?: TodoItem[];
  error?: Error;
}
