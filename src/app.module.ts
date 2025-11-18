/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [VendorModule, UserModule,TypeOrmModule.forRoot(
  { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'WorkBridge',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
 } 
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
