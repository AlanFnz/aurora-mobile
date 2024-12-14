import { useState } from 'react'

// faking the upload for now
export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = async (filePath: string): Promise<string> => {
    setIsUploading(true)
    console.log(`Uploading ${filePath} to fake S3...`)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const fakeS3Url = `https://fake-s3-bucket.com/${filePath.split('/').pop()}`
          console.log(`File uploaded: ${fakeS3Url}`)
          setIsUploading(false)
          resolve(fakeS3Url)
        } catch (error) {
          console.error('File upload failed:', error)
          setIsUploading(false)
          reject(new Error('File upload failed'))
        }
      }, 2000)
    })
  }

  return { isUploading, uploadFile }
}
