import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { ControlerModule } from './controler/controler.module';
import { UserService } from './service/service.module';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UsersRoles } from '../roles/users-roles';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/posts.model';

@Module({
  controllers: [ControlerModule],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UsersRoles, Post]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService]
})
export class UsersModule {}
