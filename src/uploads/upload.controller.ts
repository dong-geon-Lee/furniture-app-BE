import {
  Controller,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
  ) {
    const uniqueKey = `${uuidv4()}-${file.originalname}`;
    const uploadedImageUrl = await this.uploadService.upload(
      uniqueKey,
      file.buffer,
    );

    return { id: uniqueKey, message: uploadedImageUrl };
  }

  @Get()
  async getImageList() {
    const imageList = await this.uploadService.getImageList();
    return imageList;
  }
}
