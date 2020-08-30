export const todosMock = {
  list: [
    {
      id: 1,
      title: "Do homework",
      isComplete: false,
      todos: [],
    },
    {
      id: 2,
      title: "Make an app",
      isComplete: false,
      todos: {
        list: [
          {
            id: 4,
            title: "Create a list",
            isComplete: false,
            todos: {
              list: [
                {
                  id: 6,
                  title: "Add 1 item",
                  isComplete: false,
                  todos: {
                    list: [
                      {
                        id: 7,
                        title: "Image ideal title name",
                        isComplete: false,
                        todos: [],
                      },
                    ],
                    completed: [],
                  },
                },
              ],
              completed: [],
            },
          },
          {
            id: 5,
            title: "Add button to remove todo",
            isComplete: false,
            todos: [],
          },
        ],
        completed: [],
      },
    },

    {
      id: 3,
      title: "Get an offer",
      isComplete: false,
      todos: [],
    },
  ],
  completed: [],
};
