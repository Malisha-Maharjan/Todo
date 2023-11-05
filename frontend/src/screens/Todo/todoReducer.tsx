export type TodoState = {
  // is_compeleted: boolean;
  task: string;
};

export enum TodoActionKind {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  CLEAR = "CLEAR",
  // DELETE = "DELETE",
}

type TodoAction = {
  type: TodoActionKind;
  payload: TodoState;
};

export const addReducer = (state: TodoState, action: any): TodoState => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionKind.INSERT:
      return {
        ...state,
        task: payload,
      };
  }
  switch (type) {
    case TodoActionKind.CLEAR:
      return {
        task: payload,
      };
  }
  return state;
};
