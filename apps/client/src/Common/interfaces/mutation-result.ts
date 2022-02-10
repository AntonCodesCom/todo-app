import CommonQueryResult from './query-result';

type CommonMutationResult<K extends any[], T = any> = [
  (...args: K) => void,
  CommonQueryResult<T>
];

export default CommonMutationResult;
