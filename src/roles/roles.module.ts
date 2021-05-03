import { Role } from './roles.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './controler/roles.controller';
import { RolesService } from './service/roles.service';
import { UsersRoles } from './users-roles';
import { User } from 'src/users/users.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UsersRoles])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
