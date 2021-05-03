import { Role } from '../roles.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    createRole = async(dto: CreateRoleDto) => await this.roleRepository.create(dto);

    getRoleBayValue = async(value: string) => await this.roleRepository.findOne({where: { value }});
}
