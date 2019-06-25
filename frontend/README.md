# EDUC-UMU
Administrative tool that allows for the addition, editing, and removal of entries in Education's Oracle databases

## Frontend
The frontend of the OBIEE-UMU is written using the Vue.js framework. The frontend interacts with the API backend for user authentication and data retrieval from the Oracle database.

## Dependencies
To run, the OBIEE frontend requires the following dependencies:

### Vuetify
Vuetify provides a material design framework and helps improve the design and layout of the webpage. Any additions to Vue files should include Vuetify specific components to ensure the visuals are consistent

### Vuex
Vuex is a system which manages all the components of the application in a single centralized location.

### Vue Router
Vue Router is used for application routing and helps maintain the "Single Page" layout for the webapp

### Axios
Axios is used for REST calls and http requests within the application

## Running the application locally
While the frontend of the OBIEE-UMU relies on the API for most of its functionality, it is possible to host the application independently.
First, you must install all dependencies of the application
``` sh
npm install
```

If you wish to build the application you can run:
``` sh
npm run build
```

You can check linting by running
``` sh
npm run lint
```