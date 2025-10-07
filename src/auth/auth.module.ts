import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  
  imports:[
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret:'tutankamon',
      signOptions: {expiresIn: '1h'}
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],  
  exports: [AuthService],
})
export class AuthModule {}
