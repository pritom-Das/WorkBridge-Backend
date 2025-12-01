import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'admin25801', // same as in JwtModule
    });
  }

  async validate(payload: any) {
    // Payload contains { id, role }
    return { id: payload.id, role: payload.role };
  }
}
