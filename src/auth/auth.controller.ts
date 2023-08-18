import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    const { access_token } = await this.authService.generateToken(req.user); // async/await로 변경

    // 토큰을 Authorization 헤더에 설정
    res.header('Authorization', `Bearer ${access_token}`); // access_token을 사용하도록 수정
    res.json({ access_token }); // JSON 응답을 보냄
  }
}
