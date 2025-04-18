import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, signUpDto } from './dto';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  signup(@Body() dto: signUpDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto:signInDto) {
    return this.authService.login(dto);
  }
}
