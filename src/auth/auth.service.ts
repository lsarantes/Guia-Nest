import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ){}

    async validateUser(user: LoginDto){
        const foundUser =  await this.prisma.user.findUnique({
            where: {
                email: user.email
            }
        });

        if(!foundUser) return null;

        const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
        if (isPasswordValid){
            return this.jwtService.sign({
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role,
            });
        }else{
            throw new UnauthorizedException('Credenciales Invalidad');
        }
    }

    async hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('❌ Error al generar hash:', error);
        throw new InternalServerErrorException('No se pudo procesar la contraseña');
    }
    }
}
