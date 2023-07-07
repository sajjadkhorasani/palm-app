export interface ActionType<T, P = any> {
	type: T;
	payload: P;
}
