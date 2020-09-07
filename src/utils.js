export const updateTodos = (todos, id, action, newTodos = {}, temp = {}) => {
  if (id === null) {
    switch (action) {
      case "add-global":
        temp = {
          children: [...todos.children, { ...newTodo, id: newTodo.id() }],
        };
        break;
      case "remove-all":
        temp = { children: [] };
        break;
    }
  } else {
    for (let a in todos) {
      if (a === "children") {
        newTodos[a] = todos[a];
        for (let b in todos[a]) {
          const element = todos[a][b];
          const toggledCompletedElement = {
            ...element,
            isComplete: !element.isComplete,
          };
          const toggledChildrenElement = {
            ...element,
            isShowChildren: !element.isShowChildren,
          };

          if (element.id === id) {
            switch (action) {
              case "toggle-complete":
                newTodos[a][b] = toggledCompletedElement;
                break;
              case "toggle-children":
                newTodos[a][b] = toggledChildrenElement;
                break;
              case "remove":
                newTodos[a] = newTodos[a].filter((todo) => todo.id !== id);
                break;
              case "add":
                newTodos[a][b].children = [
                  ...newTodos[a][b].children,
                  { ...newTodo, id: newTodo.id() },
                ];
                break;
            }
          }

          if (newTodos[a].length) {
            updateTodos(todos[a][b], id, action, newTodos[a][b], temp);
          }
          temp = { ...newTodos };
        }
      }
    }
  }

  return temp;
};

export const newTodoMock = {
  id: () => Math.floor(Math.random() * Date.now()),
  title: "",
  isComplete: false,
  isShowChildren: true,
  children: [],
};

export const todosMock = {
  children: [
    {
      id: 13453,
      title: "Do homework",
      isComplete: false,
      isShowChildren: true,
      children: [],
    },
    {
      id: 5,
      title: "Call to myself",
      isComplete: false,
      isShowChildren: true,
      children: [],
    },
    {
      id: 2123,
      title: "Make an app",
      isComplete: false,
      isShowChildren: true,
      children: [
        {
          id: 434534,
          title: "Create a list",
          isComplete: false,
          isShowChildren: true,
          children: [
            {
              id: 634,
              title: "Add 1 item",
              isComplete: false,
              isShowChildren: true,
              children: [
                {
                  id: 7234,
                  title: "Imagine ideal title name",
                  isComplete: false,
                  isShowChildren: true,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 5345,
          title: "Add button to remove todo",
          isComplete: false,
          isShowChildren: true,
          children: [],
        },
      ],
    },
    {
      id: 3123,
      title: "Get an offer",
      isComplete: false,
      isShowChildren: true,
      children: [
        {
          id: 34456,
          title: "Buy an apple",
          isComplete: false,
          isShowChildren: true,
          children: [
            {
              id: 1238756,
              title: "Go to the shop",
              isComplete: false,
              isShowChildren: true,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
