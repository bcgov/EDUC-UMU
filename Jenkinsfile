pipeline {
  agent any
  tools{
    maven 'Maven 3.3.9'
  }
  stages {
    stage('build') {
      steps {
        sh 'mvn build'
      }
    }
    stage('') {
      steps{
        sh 'mvn test' 
      }
    }
  }
}
