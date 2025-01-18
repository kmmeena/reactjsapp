pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install' 
                sh 'npm run dev'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t my-react-app:latest .' 
            }
        }
        stage('Docker Push') {
            steps {
                sh 'docker push my-react-app:latest' 
            }
        }
         stage('Deploy to EC2') {
            steps {
                // 1. Connect to the EC2 instance
                sshConnector(
                    host: '65.0.199.74', 
                    credentialsId: '1241e31a-a737-44e4-9c7d-d3b746794c17', 
                    knownHosts: true 
                ) {
                    // 2. Run commands on the EC2 instance
                    sh 'sudo docker pull my-react-app:latest' 
                    sh 'sudo docker stop my-react-app-container' 
                    sh 'sudo docker rm my-react-app-container' 
                    sh 'sudo docker run -d -p 80:80 --name my-react-app-container my-react-app:latest' 
                }
            }
        }
    }
}
