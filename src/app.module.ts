import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { UserModule } from './User/user.module';
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [VendorModule, UserModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
