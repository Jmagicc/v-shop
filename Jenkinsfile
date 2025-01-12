pipeline {
      agent any
      environment{
//                 harborHost = '119.91.228.85:6655'
                harborAccount ='119.91.228.85:6655'
                harborRepo = 'library'
                harborUser = 'fucewei98'
                harborPasswd = 'Asdmjh5452831'
                taskName ='zhonglong-Max-h5'
//                 harborHostProd = '119.91.228.85:6655'
//                 port = '6655'
            }



      // 存放所有任务的合集
      stages {
          stage('拉取Git代码') {
              steps {
                  checkout scmGit(branches: [[name: '${tag}']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Jmagicc/v-shop.git']])

              }
          }

          stage('构建docker镜像') {
              steps {
                  sh '''docker build -t ${JOB_NAME}:${tag} .'''
              }
          }

          stage('制作自定义镜像并发布Harbor') {
              steps {
                 sh '''docker login -u ${harborUser} -p ${harborPasswd}
                  docker tag ${JOB_NAME}:${tag} ${harborAccount}/${harborRepo}/${taskName}:${tag}
                  docker push ${harborAccount}/${harborRepo}/${taskName}:${tag}'''
              }
          }

//           stage('基于Harbor部署工程') {
//               steps {
//               echo "参数 $harborHostProd $harborAccount $harborRepo $tag $port"
//                 sshPublisher(publishers: [sshPublisherDesc(configName: 'tenxunyun-114', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "/usr/bin/deploy.sh $harborHostProd $harborAccount $harborRepo  $tag $port ", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
//               }
//           }
      }
}
