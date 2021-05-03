import { User } from 'src/users/users.model';
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo,ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";

export interface PostCreateAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({
    tableName: 'posts'
})
export class Post extends Model<Post, PostCreateAttrs> {
    //@ApiProperty - Документируем в Swagger
    @ApiProperty({example: '1', description: 'prymary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        id: number;

    @ApiProperty({example: 'Name Post', description: 'Post1'})
    @Column({type: DataType.STRING})
        title: string;

    @ApiProperty({example: 'Content', description: 'Hello my world'})
    @Column({type: DataType.STRING})
        content: string;

    @ApiProperty({example: 'UserId'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
        userId: number;

    @Column({type: DataType.STRING})
        image: string;

    //устанавливаем связи
    @BelongsTo(() => User)
        author: User
}