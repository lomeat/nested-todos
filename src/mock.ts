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
      id: 29879,
      title: "Hello, its usual minimal todo list",
      isComplete: false,
      isShowChildren: true,
      children: [
        {
          id: 123,
          title: "On React/Redux + TypeScript",
          isComplete: false,
          isShowChildren: true,
          children: [
            {
              id: 456,
              title: "You can nest each in other to 3 levels",
              isComplete: false,
              isShowChildren: true,
              children: [],
            },
          ],
        },
        {
          id: 345,
          title: "Or create another tree",
          isComplete: false,
          isShowChildren: true,
          children: [],
        },
      ],
    },
    {
      id: 2431,
      title: "Other checked category",
      isComplete: true,
      isShowChildren: true,
      children: [],
    },
  ],
};
