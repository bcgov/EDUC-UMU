pipeline {
  agent any
  tools{
    maven 'Maven 3.6.1'
  }
  stages {
    stage('check install'){
      steps{
        sh 'mvn --version'
      }
    }
    stage('build') {
      steps {
        sh 'mvn package'
      }
    }
  }
}
