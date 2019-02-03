# MS&E_M.Eng.

A web app that matches incoming Master of Engineering (M.Eng.) student with projects uploaded by varies companies for the Materials Science & Engineering department at Cornell University. 

Uses Django, Django REST framework, React, and Redux.

## Installation

The application will use two different development servers for Django and React. They will run on different ports and will function as two separate domains. Because of this, we need to enable cross-origin resource sharing (CORS) to send HTTP requests from React to Django without being blocked by the browser.

Create a virtual environment using the venv Python 3 module:
```
$ python3 -m venv ./env
```

Activate the created virtual environment using source:
```
$ source env/bin/activate
```

Navigate to the project folder and install everything:
```
$ npm install
```

Then start the django server:
```
$ python manager.py runserver
```

Keep this terminal open, open a new terminal, activate the virtual env, and start the react server:
```
$ source env/bin/activate
$ cd mse_meng
$ npm start
```
