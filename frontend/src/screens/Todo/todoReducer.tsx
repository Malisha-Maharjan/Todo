export type TodoState = {
  // is_compeleted: boolean;
  task: string | null;
};

export enum TodoActionKind {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  CLEAR = "CLEAR",
  // DELETE = "DELETE",
}

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
        ...state,
        task: payload,
      };
  }
  switch (type) {
    case TodoActionKind.UPDATE:
      return {
        ...state,
        task: payload,
      };
  }
  return state;
};
