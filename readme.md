# Nested Todo-list

Live project: https://nested-todos.vercel.app/

## Description

Helps you manage your tasks and by nesting them in each other, you can divide tasks into categories. Use local storage for keeping data.

## Features

- Adding new todo to the list with pop-up modal form.
- Deleting only exist completed todo with pop-up modal.
- Changing visibility of nesting children into exist todo.
- Mark the list item is done.
- All completed elements are automatically moved to down of the list at the current nesting level.
- Limit for nesting levels is 3.
- Using local storage for keeping todos between user sessions.
- Made on TypeScript with state management

## Legend

### Commits

- **add**: Add new feature or data
- **ref**: Code refactor for comfortable reading and optimization
- **fix**: Fix some bugs in exist functionality
- **docs**: Work with comments/documentation of code. Additional information that helps to read the app
- **init**: Configure the setup of project
- **styl**: Style the components

## Roadmap

- [x] Add Redux or MobX to manage state
- [x] Remake with TypeScript
- [ ] Remake core logic with state update
- [ ] Create other UI components
- [ ] Add Drag & Drop with nesting elements
- [ ] Add animations (adding/removing)
- [ ] Redesign with simple but accent colors
- [ ] Complete all children elements when parent completed
- [ ] Remove only completed todos ant their children
- [ ] Toggle dark/light theme
- [ ] Mobile support
