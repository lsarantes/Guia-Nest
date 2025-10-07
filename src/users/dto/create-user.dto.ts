import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';


export class CreateUserDto {
    @ApiProperty({ required: true, example: 'usuario@empresa.com' })
    email: string;
    @ApiProperty({ required: true, example: 'John Deo' })
    name: string;
    @ApiProperty({ required: true, example: 'password1234' })
    password: string;
    @ApiProperty({ required: true, example: '0000-0000' })
    telephone: string;
    @ApiProperty({required: false, enum: Role, example: Role.USER,  description: 'Rol del usuario (USER o ADMIN)'})
    role?: Role;
    @ApiProperty({ required: true, example: 1, description: 'Id del Tenant' })
    tenantId: number;
}
