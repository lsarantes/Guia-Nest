import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    @Post('login')
    async login(
        @Body() data:LoginDto
    ){
        const usertoken =  await this.authService.validateUser(data);

        if(!usertoken) throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    
        return usertoken;
    }
}
