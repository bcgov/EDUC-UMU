![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

Administrative tool that allows for the addition, editing, and removal of entries in Education's Oracle databases

## SonarQube Results
![Bugs](https://sonarqube-pbuo5q-tools.pathfinder.gov.bc.ca/api/badges/measure?key=UMU&metric=bugs&template=FLAT) ![Vulnerabilities](https://sonarqube-pbuo5q-tools.pathfinder.gov.bc.ca/api/badges/measure?key=UMU&metric=vulnerabilities&template=FLAT) ![Code smells](https://sonarqube-pbuo5q-tools.pathfinder.gov.bc.ca/api/badges/measure?key=UMU&metric=code_smells&template=FLAT) ![Coverage](https://sonarqube-pbuo5q-tools.pathfinder.gov.bc.ca/api/badges/measure?key=UMU&metric=coverage&template=FLAT) ![Duplication](https://sonarqube-pbuo5q-tools.pathfinder.gov.bc.ca/api/badges/measure?key=UMU&metric=duplicated_lines_density&template=FLAT) ![Lines of code](https://sonarqube-pbuo5q-tools.pathfinder.gov.bc.ca/api/badges/measure?key=UMU&metric=lines&template=FLAT)

## About
The EDUC UMU repository contains the front and backend code for the UMU appication. The frontend of the UMU uses the [Vuetify](https://vuetifyjs.com/en/) framework, which is a custom flavour of the [Vue](https://vuejs.org/) framework. The backend of the application uses the [NodeJS](https://nodejs.org/en/) framework to facilitate authentication and database communication.

## Pipeline
This project supports end-to-end automation using Jenkins. There are five Jenkinsfiles in this project: a pipeline for tools to test, a pipeline for deployment to prod, a pipeline for e2e testing, a pipeline for ZAP scanning, and a pipeline for SonarQube analysis. The main pipeline (initiates other pipelines) is the dev pipeline. A template that allows you to import your Jenkinsfile into Openshift is located in the "openshift" folder.

![alt text](https://github.com/bcgov/EDUC-UMU/blob/master/docs/Jenkins_Pipeline.png "dev pipeline")

## License
    Copyright 2018 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
