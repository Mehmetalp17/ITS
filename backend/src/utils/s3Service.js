import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import path from 'path';

// Configure S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

/**
 * Upload a file to S3
 * @param {Object} file - The file object from multer
 * @param {string} folder - The folder path in S3 (e.g., 'internship-documents')
 * @returns {Promise<string>} - The URL of the uploaded file
 */
const uploadFileToS3 = async (file, folder = 'internship-documents') => {
    try {
        // Read file content
        const fileContent = fs.readFileSync(file.path);
        
        // Generate unique filename
        const timestamp = Date.now();
        const uniqueFileName = `${folder}/${timestamp}-${file.originalname}`;
        
        // Set up S3 upload parameters
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: uniqueFileName,
            Body: fileContent,
            ContentType: file.mimetype,
            // Make the file publicly readable (optional, depends on your S3 bucket policy)
            // ACL: 'public-read',
        };
        
        // Upload to S3
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
        
        // Delete the temporary local file
        fs.unlinkSync(file.path);
        
        // Return the S3 key (not the URL, since we'll generate signed URLs on demand)
        return uniqueFileName;
    } catch (error) {
        // Clean up local file if it exists
        if (file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        throw error;
    }
};

/**
 * Delete a file from S3
 * @param {string} s3Key - The S3 key of the file to delete
 * @returns {Promise<void>}
 */
const deleteFileFromS3 = async (s3Key) => {
    try {
        const deleteParams = {
            Bucket: BUCKET_NAME,
            Key: s3Key,
        };
        
        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw error;
    }
};

/**
 * Generate a pre-signed URL for accessing a file
 * @param {string} s3Key - The S3 key of the file
 * @param {number} expiresIn - URL expiration time in seconds (default: 1 hour)
 * @returns {Promise<string>} - The pre-signed URL
 */
const getSignedUrlForFile = async (s3Key, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: s3Key,
        });
        
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
        return signedUrl;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw error;
    }
};

export {
    uploadFileToS3,
    deleteFileFromS3,
    getSignedUrlForFile,
};
