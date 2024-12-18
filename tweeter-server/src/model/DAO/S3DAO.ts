export interface S3DAO {
    uploadImage(fileName: string, imageStringBase64Encoded: string): Promise<string>;
  }
  