import { config } from "../../config";
import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { S3DAO } from "../DAO/S3DAO";

export class DynamoS3 implements S3DAO {

    private readonly s3Client: S3Client;

    constructor(s3Client: S3Client) {
      this.s3Client = s3Client;
    }

    async uploadImage(
        fileName: string,
        imageStringBase64Encoded: string
        ): Promise<string> {
        let decodedImageBuffer: Buffer = Buffer.from(
            imageStringBase64Encoded,
            "base64"
        );
        const s3Params = {
            Bucket: config.S3_BUCKET_NAME,
            Key: "image/" + fileName,
            Body: decodedImageBuffer,
            ContentType: "image/png",
            ACL: ObjectCannedACL.public_read,
        };
        const c = new PutObjectCommand(s3Params);
        const client = new S3Client({ region: config.AWS_REGION });
        try {
            await client.send(c);
            return (
                `https://${config.S3_BUCKET_NAME}.s3.${config.AWS_REGION}.amazonaws.com/image/${fileName}`
            );
        } catch (error) {
            throw Error("s3 put image failed with: " + error);
        }
        }
}