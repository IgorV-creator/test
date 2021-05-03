import { ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Role } from "./roles.model";


@Table({
    tableName: 'users_roles',
    createdAt: false,
    updatedAt: false
})
export class UsersRoles extends Model<UsersRoles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        id: number;

    //указываем на какую таблицу ссылаться
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
        roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
        userId: number;
}