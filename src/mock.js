export const todosMock = {
  list: [
    {
      id: 1,
      title: "Do homework",
      isComplete: false,
      children: [],
    },
    {
      id: 2,
      title: "Make an app",
      isComplete: false,
      children: {
        list: [
          {
            id: 4,
            title: "Create a list",
            isComplete: false,
            children: {
              list: [
                {
                  id: 6,
                  title: "Add 1 item",
                  isComplete: false,
                  children: {
                    list: [
                      {
                        id: 7,
                        title: "Imagine ideal title name",
                        isComplete: false,
                        children: {},
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
            children: [],
          },
        ],
        completed: [],
      },
    },

    {
      id: 3,
      title: "Get an offer",
      isComplete: false,
      children: [],
    },
  ],
  completed: [],
};
