import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport"

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy, "jwt") {
     
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "BOOOM" // CHANGE THIS
        });
    }

    validate(payload: any[]) {
        return payload;
    }

}