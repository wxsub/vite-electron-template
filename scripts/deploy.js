const Minio = require('minio')
const { version } = require('../package.json')
const walk = require('walk')
const fs = require('fs')
const path = require('path')

const minioClient = new Minio.Client({
  endPoint: 'minio-api.dxznjy.com',
  useSSL: true,
  accessKey: 'DyFF2VTpL1TsdnnzOJpJ',
  secretKey: 'ScmxsAkGTAUeiD4WK8Xc1zZNEdSlLreo4O3ltQmN'
})

const config = {
  localPath: path.resolve(__dirname, '../dist/KingSchoolMeetingSetup.exe'),  // 本地文件或文件夹路径
  bucketName: 'meeting',                               // 目标桶名
  minioBasePath: `PC/${version}`                       // MinIO中的基础路径
}

if (!fs.existsSync(config.localPath)) {
  console.error(`错误：本地路径不存在 → ${config.localPath}, 执行build生成文件`)
  process.exit(1)
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  
  const contentTypeMap = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
    '.exe': 'application/exe'
  }
  
  return contentTypeMap[ext] || 'application/octet-stream'
}

async function uploadSingleFile(localFilePath) {
  try {
    const fileName = path.basename(localFilePath)
    const minioObjectName = path.join(config.minioBasePath, fileName).replace(/\\/g, '/')
    
    console.log(`开始上传文件: ${localFilePath}`)
    
    await new Promise((resolve, reject) => {
      minioClient.fPutObject(
        config.bucketName,
        minioObjectName,
        localFilePath,
        { 'Content-Type': getContentType(localFilePath) },
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
    
    console.log(`✅ 上传成功: ${minioObjectName}`)
    return { success: true }
  } catch (error) {
    console.error(`❌ 上传失败: ${localFilePath} - ${error.message}`)
    return { success: false, error: error.message }
  }
}

function uploadFolder(localFolderPath) {
  return new Promise((resolve) => {
    console.log(`开始上传文件夹: ${localFolderPath}`)
    
    const walker = walk.walk(localFolderPath)
    let fileCount = 0
    let successCount = 0
    let failCount = 0
    const failedFiles = []
    let isCompleted = false

    walker.on('file', (root, fileStats, next) => {
      fileCount++
      const localFilePath = path.join(root, fileStats.name)
      const relativePath = path.relative(localFolderPath, root)
      const minioObjectName = path.join(
        config.minioBasePath, 
        relativePath, 
        fileStats.name
      ).replace(/\\/g, '/')

      minioClient.fPutObject(
        config.bucketName,
        minioObjectName,
        localFilePath,
        { 'Content-Type': getContentType(localFilePath) },
        (err) => {
          if (err) {
            failCount++
            failedFiles.push({ path: localFilePath, error: err.message })
            console.error(`❌ 上传失败: ${localFilePath} - ${err.message}`)
          } else {
            successCount++
            console.log(`✅ 上传成功 [${successCount}/${fileCount}]: ${minioObjectName}`)
          }
          next()
        }
      )
    })

    walker.on('errors', (root, nodeStatsArray, next) => {
      nodeStatsArray.forEach(stat => {
        console.error(`❌ 遍历错误: ${stat.name} - ${stat.error.message}`)
      })
      next()
    })

    walker.on('end', () => {
      console.log('\n📊 上传总结:')
      console.log(`- 总文件数: ${fileCount}`)
      console.log(`- 成功上传: ${successCount}`)
      console.log(`- 上传失败: ${failCount}`)
      
      if (failedFiles.length > 0) {
        console.log('\n❌ 失败文件列表:')
        failedFiles.forEach((file, index) => {
          console.log(`${index + 1}. ${file.path}: ${file.error}`)
        })
      } else if (fileCount > 0) {
        console.log('\n🎉 所有文件均上传成功!')
      } else {
        console.log('\nℹ️ 文件夹为空，没有文件需要上传')
      }
      
      isCompleted = true
      resolve({
        total: fileCount,
        success: successCount,
        failed: failCount,
        errors: failedFiles
      })
    })

    setTimeout(() => {
      if (!isCompleted) {
        console.log('\n⚠️ 上传超时')
        resolve({
          total: fileCount,
          success: successCount,
          failed: failCount,
          errors: failedFiles,
          timeout: true
        })
      }
    }, 3600000)
  })
}

async function StartUploadingToMinIO() {
  try {
    const bucketExists = await minioClient.bucketExists(config.bucketName)
    if (!bucketExists) {
      await minioClient.makeBucket(config.bucketName)
      console.log(`✅ bucket "${config.bucketName}" Does not exist; automatically created.`)
    } else {
      console.log(`✅ bucket "${config.bucketName}" Already exists`)
    }

    const stats = fs.statSync(config.localPath)
    
    if (stats.isFile()) {
      await uploadSingleFile(config.localPath)
    } else if (stats.isDirectory()) {
      await uploadFolder(config.localPath)
    } else {
      console.error(`❌ 不支持的文件类型: ${config.localPath}`)
    }

  } catch (error) {
    console.error(`\n❌ 上传过程中发生错误：`, error.message)
  }
}

StartUploadingToMinIO()