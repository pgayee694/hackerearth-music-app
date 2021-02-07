export function createActionCreator<T>() {
  return <P = void>() => <V extends T>(type: V) => (payload: P) => ({
    type,
    payload,
  });
}
