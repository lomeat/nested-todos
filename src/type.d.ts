type TodoId = number;

interface ITodo {
  id: TodoId;
  title: string;
  isComplete: boolean;
  isShowChildren: boolean;
  children: ITodo[];
}

type Tree = ITodo[];

type TodoState = {
  children: Tree;
};

type TodoReduxState = {
  todos: TodoState;
};

type TodoAction = {
  type: string;
  id?: TodoId;
  title?: string;
};

type DispatchTodoType = (args: TodoAction) => TodoAction;
