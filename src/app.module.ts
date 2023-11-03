import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
})
export class AppModule {}
