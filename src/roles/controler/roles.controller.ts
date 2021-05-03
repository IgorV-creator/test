import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesService } from '../service/roles.service';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getBayValue(@Param('value') value:string) {
        return this.roleService.getRoleBayValue(value);
    }
}
