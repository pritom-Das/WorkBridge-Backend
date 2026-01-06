import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';  

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
       
      jwtFromRequest: (req: Request) => { 
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['token']; 
        }
        return token;
      },
      secretOrKey: 'admin25801', 
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}