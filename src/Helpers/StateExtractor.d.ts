type StatePropsNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type StateProps<T> = Pick<T, StatePropsNames<T>>;

type DispatchPropsNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type DispatchProps<T> = Pick<T, DispatchPropsNames<T>>;
