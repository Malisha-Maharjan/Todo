import { Dispatch, SetStateAction, createContext } from "react";
// const [add, setAdd] = useState(" ");
type updateContext = {
  update: boolean;
  id: number | null;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

export const UpdateTodo = createContext<updateContext>({
  update: false,
  id: null,
  setUpdate: () => {},
});
