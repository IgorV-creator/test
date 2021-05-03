import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private JwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context. switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException( {message: 'Пользователь не авторизован'})
            }
            const user = this.JwtService.verify(token);
            req.user = user;
            //true acsses
            return true
        } catch(e) {
            throw new UnauthorizedException( {message: 'Пользователь не авторизован'})
        }
    }
}