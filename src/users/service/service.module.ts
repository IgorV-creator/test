import { BanUserDto } from './../../roles/dto/ban-user.dto';
import { HttpStatus } from '@nestjs/common';
import { Injectable, HttpException } from '@nestjs/common';
import { User } from '../users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from 'src/roles/service/roles.service';
import { AddRoleDto } from 'src/roles/dto/add-role.dto';

//Инжектим запросы
@Injectable({})
export class UserService {
    // передаем модель User (userRepository)
    constructor(@InjectModel(User) private  userRepository: typeof User, private roleService: RolesService){}

    //создаем пользователей и передаем объект dto для обмена данными с БД (создание Пользователя)
    createUser = async(dto: CreateUserDto) => {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleBayValue('ADMIN')
        console.log('*** ',role);
        console.log('### ',user.id);
       //добавляем роль в БД
        await user.$set('roles', [role.id]);
         //Присвоим роль пользователю
        user.roles = [role]
        return user
    };

    //получаем всех пользователей из БД
    getAllUser = async() => await this.userRepository.findAll({include: { all: true }});

    // получаем пользователя по email
    getUsersBayEmail = async(email: string) => await this.userRepository.findOne({where: { email }, include:{ all: true }});

    addRole = async(dto:AddRoleDto) => {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleBayValue(dto.value);
        if(role && user){
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    ban = async(dto:BanUserDto) => {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user){
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user. banReason = dto.banReason
        await user.save();
        return user
    }
}
