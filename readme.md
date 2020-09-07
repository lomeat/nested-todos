# Nested Todo App

Live project: https://digital-spectr.vercel.app

## Description

Nested Todo List app helps you manage your tasks for the day, and by nesting them in each other, you can divide tasks into categories. Completed tasks are moved to the bottom of the list, depending on the nesting level.
Maximum nesting limit: 3

App made for [Digital Spectr](https://digital-spectr.ru/) as test job.

## Conditions

- [x] Adding an item to the Todo list. When you click the ADD ITEM button, a pop-up window opens with a form.
- [x] Deleting a list item (should be available only for already completed items). When you click the DELETE link, a pop-up window appears “Are you sure you want to delete the item?”
- [x] Mark the list item as done (checkbox)
- [x] All completed elements are automatically moved to the end of the list at the current nesting level
- [x] For external design, you can use frameworks like bootstrap
- [x] Limit the allowed nesting of elements to 3 levels

## Additional features

- "Show/Hide" button allows to control visibility of children todos of every nested element
- Pretty icons
- Simple minimalistic colors
- Saving all current todos to local storage

## Legend

### Code

- **WD**: What is Does. Describe what function does for user
- **HW**: How it Works. Describe how function works into the code

### Commits

- **add**: Add new feature or data
- **ref**: Code refactor for comfortable reading and optimization
- **fix**: Fix some bugs in exist functionality
- **docs**: Work with comments/documentation of code. Additional information that helps to read the app
- **init**: Configure the setup of project
- **styl**: Style the components

---

## Roadmap

- [ ] Add Drag & Drop with nesting elements
- [ ] Increase nested level to infinity
- [ ] Add animations (adding/removing)
- [ ] Add Redux or MobX to manage state
- [ ] Remake core logic with state update
- [ ] Redesign with simple but accent colors
- [ ] Create other UI components
- [ ] Complete all children elements when parent completed
- [ ] Remove only completed todos ant their children
- [ ] Toggle dark/light theme
- [ ] Mobile support
- [ ] Authentification with Google API
