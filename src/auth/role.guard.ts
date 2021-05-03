import { ROLES_KEY } from './role-auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoletGuard implements CanActivate {
    constructor(
        private JwtService: JwtService,
        private reflector: Reflector
        ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if(!requireRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException( {message: 'Пользователь не авторизован'})
            }
            const user = this.JwtService.verify(token);
            req.user = user;
            //true acsses
            return user.roles.some(role => requireRoles.includes(role.value))
        } catch(e) {
            throw new HttpException('Нет доступа',HttpStatus.FORBIDDEN)
        }
    }
}