import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './Enteties/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([AdminEntity]),PassportModule,
    JwtModule.register({
      secret: 'admin25801', // replace with env variable in production
      signOptions: { expiresIn: '1h' },
    }),],
  providers: [AdminService,JwtStrategy],
  controllers:[AdminController]
})
export class AdminModule {}
