def templateName = 'hello-webapp'
pipeline {
  agent any
  stages {
    stage('preamble') {
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject() {
                        echo "Using project: ${openshift.project()}"
                    }
                }
            }
        }
    }
    stage('cleanup') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                        openshift.selector("all", [ template : templateName ]).delete() 
                        if (openshift.selector("secrets", templateName).exists()) { 
                            openshift.selector("secrets", templateName).delete()
                        }
                        }
                    }
                }
            }
    }
  }
}
