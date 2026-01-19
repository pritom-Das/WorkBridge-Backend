import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

// CHANGE HERE: Add 'vendor-jwt' as the second argument
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'vendor-jwt') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['token'];
        }
        return token;
      },
      secretOrKey: 'admin25801', // Make sure this matches VendorModule
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}