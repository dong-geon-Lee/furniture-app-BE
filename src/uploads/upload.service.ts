import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_S3_BUCKET'),
        Key: fileName,
        Body: file,
        ContentType: 'image/jpeg',
      }),
    );

    return '이미지가 업로드되었습니다';
  }

  async getImageList() {
    const response = await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: this.configService.get('AWS_S3_BUCKET'),
      }),
    );

    const bucketUrl = this.configService.get('AWS_SC_URL');
    const imageList = response.Contents.map((object: any) => ({
      id: object.Key,
      url: bucketUrl + object.Key,
      createdAt: object.LastModified,
    }));

    return { bucketItems: imageList };
  }
}
