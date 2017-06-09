# Commands Library
This is the curated library of commands for Backtick. These are the commands available on the options page.

If you think you have an awesome command you would like to be available to all Backtick users follow these instructions: 

1. Fork this repo

2. Duplicate the `example-command` folder.

3. Replace the `command.js` file with your JavaScript. This will be injected into and executed on the page the user is currently on when they run it.

4. Replace the `details.json` file with your command metadata:
    
    **slug**: The unique url-friendly identifier of the command.<br>
    **name**: The name of the command.<br>
    **description**: A short description about what the command does.<br>
    **author** (optional): Github username.<br>
    **icon** (optional): A link to a 60x60 PNG icon.<br>
    **link** (optional): A link to a related home page.

5. Submit your PR.

6. Dance

Note: The `_library` folder contains tasked used to build the library and for validation and testing.
Repository serving as a CDN here: https://backtick.ninja/library/
