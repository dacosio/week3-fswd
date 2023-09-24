## Usage

### Install dependencies

```
npm install
```

### Run React dev server (http://localhost:3000)

```
npm start
```

### Run the JSON server (http://localhost:5000)

```
npm run server
```

# Task Management App Readme

This readme provides a step-by-step guide on how to implement the requested features for the Task Management App.

## Checklist

- [x] **Add a status field in the db.json file:** Modify the database file (db.json) to include a 'status' field for each task. This field will be used to track whether a task is active or completed.

- [x] **Modify the current App to filter and display only tasks with an active status:** In the main App component, update the code to filter and display only tasks with an active status. You can define 'active' as tasks that are not yet completed.

- [x] **Add a new route '/completed':** Create a new route in your app with the path '/completed'. You can name it whatever you prefer, but for consistency, we will refer to it as '/completed' in this readme.

- [x] **Create a new page to view completed tasks, re-activate a task, and completely remove a task:** On the '/completed' route, create a new page that allows users to view completed tasks. Provide options to re-activate a completed task and permanently remove a task.

- [x] **Follow the Data Stream through the App and Modify the current App to handle this field:** Update the App component to handle the new 'status' field in tasks appropriately. Ensure that tasks are added, modified, and completed without deleting completed tasks.

- [x] **Ensure that this new functionality operates independently of the Task Viewer/Adder Route:** Make sure that the new functionality for handling completed tasks does not interfere with the Task Viewer/Adder Route. The Task Viewer/Adder Route should remain functional.

- [x] **Add a Link in the footer to navigate to this Route:** In your app's footer, add a link that allows users to navigate to the '/completed' route. This link should be easily accessible to users.

- [x] **Use the Predefined Classes and CSS to style the page to look unified:** Apply consistent styling to the '/completed' page using predefined CSS classes or styles to ensure a cohesive design.

- [x] **Keep the X, but also add a "check" (non-functional) to show that the task has been completed:** On the Task Viewer page, keep the 'X' button to delete tasks permanently. Additionally, add a non-functional "check" icon or indicator to show that a task has been completed. This icon should be placed near the 'X' button.

- [x] **Find a third icon (maybe like a circular arrow) to indicate re-activation:** Choose a third icon, such as a circular arrow, to indicate the re-activation of completed tasks.
