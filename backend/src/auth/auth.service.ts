import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { signInDto, signUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable({})
export class AuthService {
  constructor(
    private pool: DatabaseService,
    private jwt: JwtService,
  ) {}

  async signup(dto: signUpDto) {

    await bcrypt.hash(dto.password, 10).then((hash)=>{
      dto.password=hash
    })

    const result = await this.pool.query('INSERT INTO "user" (email, password, username) VALUES ($1, $2, $3)',[dto.email, dto.password, dto.username],);

    if (result.type == 'SUCCESS' && result.data.rowCount > 0) {
      return { type: 'SUCCESS', msg: 'Successfully created new user!' };
    } else {
      return result;
    }
  }

  async login(dto: signInDto) {
    const result = await this.pool.query(
      'SELECT email, username, password, is_admin FROM "user" WHERE email = $1',[dto.email]);

    if(result.type=="SUCCESS" && result.data.rowCount==0) {
      return {type: "ERROR", msg: "User with this email does not exist!"}
    }

    const passwordMatch = await bcrypt.compare(dto.password, result.data.rows[0].password).then((result)=>(result));

    if (result.type == 'SUCCESS' && result.data.rowCount > 0 && passwordMatch) {
      delete result.data.rows[0].password;
      return {
        type: 'SUCCESS',
        msg: "Sucessfully logged in user!",
        data: await this.signToken(result.data.rows[0]),
      };
    } else {
      return {type: "ERROR", msg: "Invalid email or password!"};
    }
  }

  signToken(payload: { email: string; username: string }): Promise<string> {
    return this.jwt.signAsync(payload, {
      // chnage to config
      secret: 'BOOOM',
    });
  }
}
