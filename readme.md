# Nested Todo App

Live project: https://digital-spectr.vercel.app

## Description

Helps you manage your tasks and by nesting them in each other, you can divide tasks into categories. Use local storage for keeping data.

App made for [Digital Spectr](https://digital-spectr.ru/) as test job.

## Conditions

### Iteration 1

- [x] Adding an item to the list. When you click the ADD ITEM button, a pop-up window opens with a form.
- [x] Deleting a list item (should be available only for already completed items). When you click the DELETE button, a pop-up window appears “Are you sure you want to delete the item?”
- [x] Mark the list item as done (checkbox)
- [x] All completed elements are automatically moved to the end of the list at the current nesting level
- [x] For external design, you can use frameworks like bootstrap
- [x] Limit the allowed nesting of elements to 3 levels
- [x] "Show/Hide" button to control visibility of children todos
- [x] Use local storage for keeping todos

### Iteration 2

- [ ] Remake on TypeScript
- [ ] Add state management
- [ ] Divide responsibility between modules
- [ ] Separate code and styles

## Legend

### Commits

- **add**: Add new feature or data
- **ref**: Code refactor for comfortable reading and optimization
- **fix**: Fix some bugs in exist functionality
- **docs**: Work with comments/documentation of code. Additional information that helps to read the app
- **init**: Configure the setup of project
- **styl**: Style the components

<!-- ---

## Roadmap

- [ ] Add Redux or MobX to manage state
- [ ] Remake core logic with state update
- [ ] Create other UI components
- [ ] Add Drag & Drop with nesting elements
- [ ] Add animations (adding/removing)
- [ ] Redesign with simple but accent colors
- [ ] Complete all children elements when parent completed
- [ ] Remove only completed todos ant their children
- [ ] Toggle dark/light theme
- [ ] Mobile support -->
