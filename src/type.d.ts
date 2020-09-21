type TodoId = number;
type TodoTitle = string;

interface ITodo {
  id: TodoId;
  title: string;
  isComplete: boolean;
  isShowChildren: boolean;
  children: ITodo[];
}

type Tree = ITodo[];

interface TodoState {
  children: Tree;
}

interface TodoReduxState {
  todos: TodoState;
}

interface TodoAction {
  type: string;
  id?: TodoId;
  title?: string;
}

type DispatchTodoType = (args: TodoAction) => TodoAction;
