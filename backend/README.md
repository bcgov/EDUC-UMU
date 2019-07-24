# EDUC-UMU
Administrative tool that allows for the addition, editing, and removal of entries in Education's Oracle databases

The backend portion of the UMU uses the NodeJS framework along with various npm packages to provide a consumable API to the frontend. The API provides two functions: user authentication and database interaction. To run the UMU, you must have a basic understanding of Kubernetes/OpenShift and you must have an OpenShift workspace to build and deploy the application in.

## Project Setup
In order to succesfully deploy this project into an OpenShift environment, there are a few steps you need to take. The first step is ensuring all environment variables the application uses are available in Openshift. This application leverages secrets for database credentials, single-sign on credentials, and database table names. The following secrets must exist within your OpenShift environment for the API to function:

| Secret Name | Variable Name | Value |
| --- | --- | --- |
| sso-credentials | SSO_CLIENT_ID | The client ID for the SSO client you are using. Found in your SSO realm. |
| sso-credentials | SSO_USER_SECRET | The client secret for the SSO client you are using. Found in the credentials tab of the SSO client |
| sso-credentials | SSO_PUBLIC_KEY | The public key for your SSO realm. Found in the realm setting tab of your SSO realm. |
| oracledb-config | ORACLE_USER | The username/schema for the Oracle database you are connecting to |
| oracledb-config | ORACLE_PASSWORD | The password for the Oracle database you are connecting to. |
| oracledb-config | ORACLE_CONNECT | The connect string for the Oracle database you are connecting to. Connect string syntax can be found [here](https://github.com/oracle/node-oracledb/blob/master/doc/api.md) |
| oracle-tables | AUTH_TABLE | The table containing auth users |
| oracle-tables | PROXY_TABLE | The table containing proxy roles |
| oracle-tables | ROLES_TABLE | The table containing general roles |

For more info on how to set up secrets in openshift, [click here](https://docs.openshift.com/container-platform/3.5/dev_guide/secrets.html)

Once you have the appropriate secrets initialized in your OpenShift environment, you can begin the build and deployment process. This project uses Jenkins to build and deploy OpenShift objects known as build-configs and deployment-configs. The Jenkinsfile, Jenkins init yaml, and the build and deploy configs are located in the [openshift folder](https://github.com/bcgov/EDUC-UMU/tree/master/openshift) in the root folder. To initailize the Jenkins pipeline, simply import the jenkins-template.yaml into your Openshift Tools environment. Once the pipeline is set up, simply press the "start pipeline" button and the application will build and deploy automatically. There are environment specific variables within the Jenkinsfile that can be set to customize the way the pipeline is executed.

## Docker Strategy
The NodeJS API is built using the docker strategy. Due to the need for this application to connect to an Oracle database, the application is built on top of an oracle-linux image. The Dockerfile adds the necessary Oracle instant client libraries and NodeJS dependencies before performing a npm install. 

## Database
The main functionality of the backend is to provide easy to consume API endpoints that perform selects, inserts, and updates to an Oracle database. The database API endpoints are protected by a json-web-token authentication strategy that is authorized by a Red Hat SSO realm.

## Authentication
The authentication process for this application is done in two stages: authentication and authorization. The authentication step is triggered when a user attempts to login to the appliation. Authentication is done using OpenID Connect, which is a popular authentication protocol. When users login using IDIR they are issued a json-web-token (jwt) which is used later in the authorization step.

For authorization, the UMU leverages the previously mentioned jwt. When a user tries to access a protected API endpoint, their jwt will be sent along with a SSO realm public key to an authorization endpoint which determines whether the user should be able to access the requested resource.

For more information on setting up your own instance of Red Hat SSO, [click here](https://developer.gov.bc.ca/Requesting-a-SSO-Realm-to-be-created)