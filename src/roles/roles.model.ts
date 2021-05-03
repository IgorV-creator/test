import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UsersRoles } from "./users-roles";

export interface RoleCreateAttrs {
    value: string,
    description: string
}

@Table({
    tableName: 'roles'
})
export class Role extends Model<Role, RoleCreateAttrs> {
    //@ApiProperty - Документируем в Swagger
    @ApiProperty({example: '1', description: 'prymary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        id: number;

    @ApiProperty({example: 'ADMIN', description: 'User roles'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
        value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
        description: string;
    //Устанавливаем связь Пользователя один-ко многим в таблице UsersRoles
    @BelongsToMany(() => User, () => UsersRoles)
        users: User[];
}