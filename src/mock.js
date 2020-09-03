export default {
  children: [
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
      children: [
        {
          id: 4,
          title: "Create a list",
          isComplete: false,
          children: [
            {
              id: 6,
              title: "Add 1 item",
              isComplete: false,
              children: [
                {
                  id: 7,
                  title: "Imagine ideal title name",
                  isComplete: false,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 5,
          title: "Add button to remove todo",
          isComplete: false,
          children: [],
        },
      ],
    },
    {
      id: 3,
      title: "Get an apple",
      isComplete: false,
      children: [
        {
          id: 10,
          title: "Buy an apple",
          isComplete: false,
          children: [],
        },
      ],
    },
  ],
};
