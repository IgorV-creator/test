import { ValidatePipe } from './../../pipes/validation.pipe';
import { RoletGuard } from './../../auth/role.guard';
import { User } from './../users.model';
import { Body, Get, Post, Controller, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from '../service/service.module';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { AddRoleDto } from 'src/roles/dto/add-role.dto';
import { BanUserDto } from 'src/roles/dto/ban-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class ControlerModule {
    // инжектим UserService
    constructor(private userService: UserService){}

    //@Api Документируем в Swagger
    @ApiOperation({summary: 'endpoint создания пользователя'})
    @ApiResponse({ status: 200, type: User })
    // @UsePipes(ValidatePipe)//Валидация поля при создании Пользователя перенес в глобальную зону main.ts
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    //endpoint получения роль
    //Документируем в Swagger
    @ApiOperation({summary: 'endpoint получения пользователя'})
    @ApiResponse({ status: 200, type: [User]})
    @UseGuards(JwtGuard)
    //указываем роли кому предоставляем доступ к endpoint
    @Roles('ADMIN')
    @UseGuards(RoletGuard)
    @Get()
    getAll() {
        return this.userService.getAllUser()
    }

    //endpoint выдачи ролей
    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({ status: 200})
    @Roles('ADMIN')
    @UseGuards(RoletGuard)
    @Post('/role')
    addRole(@Body() dto:AddRoleDto) {
        return this.userService.addRole(dto)
    }

    //endpoint бана
    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({ status: 200})
    @Roles('ADMIN')
    @UseGuards(RoletGuard)
    @Post('/ban')
    ban(@Body() dto:BanUserDto) {
        return this.userService.ban(dto)
    }

}
