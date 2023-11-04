import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { StorageItemModule } from './storage-item/storage-item.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    StorageModule,
    StorageItemModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
