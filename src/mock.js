export const newElement = {
  id: () => Math.floor(Math.random() * Date.now()),
  title: "New todo",
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
          children: [],
        },
      ],
    },
  ],
};
