pipeline{
    agent any
    parameters{
        string(defaultValue: 'https://github.com/bcgov/EDUC-UMU.git', description: 'Source Code Repo URL', name: 'gitRepo')
        string(defaultValue: 'dev', description: 'Git Branch or Tag Name', name: 'gitBranch')
    }
    stages {
    stage ('checkout') {
        steps {
            git branch: '${gitBranch}', url: "${gitRepo}"
        }
    }
}