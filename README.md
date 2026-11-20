# Project 02 — Interactive To-Do List with LocalStorage

A responsive task manager built for the InternCircle Fullstack Web Development Project 02.

## Features
- Add tasks using the Add task button or Enter key
- Rejects empty task input
- Mark tasks complete and undo completion
- Delete individual tasks
- Filter by All, Active and Done
- Clear all completed tasks
- Shows the remaining-task counter
- Saves tasks in LocalStorage and restores them after reload
- Handles invalid/corrupted stored JSON without breaking the app
- Uses `textContent` for user-entered task text rather than `innerHTML`
- Responsive layout for desktop and mobile screens

## Files
- `index.html` — semantic page structure and form
- `style.css` — responsive styling using CSS Flexbox and Grid
- `app.js` — DOM manipulation, event listeners, app state and LocalStorage

## Run in VS Code
1. Extract the ZIP file.
2. Open the extracted `sneha_todo_project02` folder in VS Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a modern browser. Live Server is recommended while developing.

## Check LocalStorage
1. Open the app in your browser.
2. Press F12 to open Developer Tools.
3. Open the Application tab (in some browsers, Storage).
4. Select Local Storage and the app's page origin.
5. Look for the `sneha-todo-tasks` key.

## Test before submission
- Add a task using the button.
- Add another task by pressing Enter.
- Try submitting an empty task.
- Mark a task complete, then undo it.
- Delete a task.
- Test All, Active and Done filters.
- Clear completed tasks.
- Reload the page and confirm remaining tasks are still present.
- Add several tasks and confirm the remaining counter stays correct.
- Test in a private/incognito window: it should start with an empty list.

## Publish with GitHub Pages
1. Create a public GitHub repository, for example `sneha-todo-list`.
2. Upload `index.html`, `style.css`, `app.js` and this README.
3. Commit the files to the `main` branch.
4. Open repository **Settings → Pages**.
5. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
6. Wait for GitHub Pages to publish the live app URL.

## What to submit to InternCircle
The learner guide asks for:
- A link to the live app
- A link to the code
- A short description of how you save and load data

Suggested submission note:
"Tasks are stored in one JavaScript array while the app is running. The save() function converts the array to JSON with JSON.stringify() and stores it in LocalStorage. At startup, load() reads the saved text, parses it with JSON.parse() inside try/catch, and render() rebuilds the task list from the array."

Personalize the project and understand the code before submitting. The guide notes that the worked example is a standard to aim for, not something to copy.
