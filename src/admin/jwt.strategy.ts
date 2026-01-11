import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
  (req) => req?.cookies?.access_token, // read JWT from cookie
]),

      secretOrKey: 'admin25801', 
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload); // add this
    return { id: payload.id, role: payload.role };
  }
}
