import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { signInDto, signUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private pool: DatabaseService,
    private jwt: JwtService,
  ) {}

  async signup(dto: signUpDto) {
    const result = await this.pool.query(
      'INSERT INTO "user" (email, password, username) VALUES ($1, $2, $3)',
      [dto.email, dto.password, dto.username],
    );

    if (result.type == 'SUCCESS' && result.data.rowCount > 0) {
      return { type: 'SUCCESS', msg: 'Created new user' };
    } else {
      return result;
    }
  }

  async login(dto: signInDto) {
    const result = await this.pool.query(
      'SELECT email, username FROM "user" WHERE email = $1 AND password = $2',
      [dto.email, dto.password],
    );

    if (result.type == 'SUCCESS' && result.data.rowCount > 0) {        
        return {
        type: 'SUCCESS',
        msg: await this.signToken(result.data.rows[0]),
      };
    } else {
      return result;
    }
  }

  signToken(payload: { email: string; username: string }): Promise<string> {
    return this.jwt.signAsync(payload, {
      // chnage to config
      secret: 'BOOOM',
    });
  }
}
