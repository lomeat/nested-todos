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
      id: 123,
      title: "Hello! Some examples of using app",
      isComplete: false,
      isShowChildren: true,
      children: [],
    },
    {
      id: 121233,
      title: "You can nest todo each in other",
      isComplete: false,
      isShowChildren: true,
      children: [
        {
          id: 234,
          title: "And it is the first nested level",
          isComplete: false,
          isShowChildren: true,
          children: [],
        },
      ],
    },
    {
      id: 432,
      title: "Or make 3-level nested tree!",
      isComplete: false,
      isShowChildren: true,
      children: [
        {
          id: 3452,
          title: "At textfield above you add todos to main list",
          isComplete: false,
          isShowChildren: true,
          children: [
            {
              id: 25234,
              title: "But try to click '+' button there ->",
              isComplete: false,
              isShowChildren: true,
              children: [
                {
                  id: 6154,
                  title: "At last nested level you cannot add anything",
                  isComplete: false,
                  isShowChildren: true,
                  children: [],
                },
                {
                  id: 56745,
                  title: "Oh, it's already completed!",
                  isComplete: true,
                  isShowChildren: true,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 3412352,
          title: "Chevron helps to show/hide unnecessary deals",
          isComplete: false,
          isShowChildren: false,
          children: [
            {
              id: 45234,
              title: "All data save to local cache",
              isComplete: false,
              isShowChildren: false,
              children: [],
            },
            {
              id: 345345,
              title: "So try to edit something and reload page!",
              isComplete: false,
              isShowChildren: false,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 29879,
      title: "WARNING! Trash icon - DELETE everything!",
      isComplete: false,
      isShowChildren: true,
      children: [],
    },
  ],
};
