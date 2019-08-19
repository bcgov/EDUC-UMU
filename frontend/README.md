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

## Testing
The frontend of the UMU has two sets of tests. Unit tests are run on static code, while e2e tests are run on the code that requires a server.

### Unit Tests
The unit tests in this project are run by [Jest](https://jestjs.io/), and gather coverage from all the static files. Configuration for Jest can be found at the bottom of the package.json.

### e2e Tests
e2e tests run mock browsers (firefox and chrome in this case) to test that dynamic elements of the project are able to run on multiple browsers. The e2e testing suite that is being used for this project is [Nightwatch](https://nightwatchjs.org/). To run e2e tests locally, you must have firefox and chrome installed. If you have firefox and chrome installed and the e2e tests are still not working, you can set the path to the browser binaries in nightwatch.json. 
Example:
```json
    "moz:firefoxOptions": {
        "args": ["-headless"],
        "binary": "PATH_TO_FIREFOX_BINARY"
    }
```
If you are running e2e tests on OpenShift, you first need to setup the e2e Jenkins node. This node installs all binaries and dependencies needed to run headless chrome and firefox. To begin the build of the Jenkins node, run:
```sh
oc process -f e2e.bc.yaml | oc create -n ENVIRONMENT_NAME-tools -f -
```
This build will take quite a while (~1 hour), so be patient while it is running. Once the build is complete, you can reference the node in your pipeline. An example of this is located [here](https://github.com/ndenny1/EDUC-UMU/blob/master/e2e-Jenkinsfile).

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

Unit tests can be run using
``` sh
npm run test:unit
```

Nightwatch e2e tests can be run using
``` sh
npm run test:e2e
```