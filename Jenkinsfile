pipeline {
  agent any
  tools{
    maven 'Maven 3.6.1'
  }
  stages {
    stage('build') {
      steps {
        sh 'mvn --version'
      }
    }
  }
}
