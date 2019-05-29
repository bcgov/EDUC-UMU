pipeline {
  agent any
  tools{
    maven
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
