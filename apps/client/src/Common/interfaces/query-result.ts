export default interface CommonQueryResult<T = any> {
  loading: boolean;
  error?: Error;
  data?: T;
}
