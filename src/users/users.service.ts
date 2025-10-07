import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

  bcrypt = require('bcryptjs');
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) { }
  async create(createUserDto: CreateUserDto) {
    const dataToInsert: any = { ...createUserDto };

    if (dataToInsert.password) {
      const hashedPassword = await this.authService.hashPassword(dataToInsert.password);
      dataToInsert.password = hashedPassword;
    }
    return this.prisma.user.create({ data: dataToInsert });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dataToUpdate: any = { ...updateUserDto };

    if (updateUserDto.password) {
      const hashedPassword = await this.authService.hashPassword(updateUserDto.password);
      dataToUpdate.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
