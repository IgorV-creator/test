import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { UsersRoles } from "../roles/users-roles";
import { Role } from "../roles/roles.model";
import { Post } from "src/posts/posts.model";

export interface UserCreateAttrs {
    email: string,
    password: string
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreateAttrs> {
    //@ApiProperty - Документируем в Swagger
    @ApiProperty({example: '1', description: 'prymary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        id: number;

    @ApiProperty({example: 'example@example.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
        email: string;

    @ApiProperty({example: '123', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
        password: string;

    @ApiProperty({example: 'false', description: 'User no banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
        banned: boolean;

    @ApiProperty({example: 'false', description: 'User no banReason'})
    @Column({type: DataType.STRING, allowNull: true})
        banReason: string;

    //Устанавливаем связи
    // один-ко многим в таблице UsersRoles
    @BelongsToMany(() => Role, () => UsersRoles)
        roles: Role[];
    //многое к одному в таблице Post
    @HasMany(() => Post)
        posts: Post[];
}