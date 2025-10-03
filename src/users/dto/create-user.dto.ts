import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true, example: 'usuario@empresa.com' })
    email: string;
    @ApiProperty({ required: true, example: 'John Deo' })
    name: string;
    username?: string;
    @ApiProperty({ required: true, example: 'password1234' })
    password: string;
    @ApiProperty({ required: true, example: 1,description:'Id del Tenant' })
    tenantId: number;
}
