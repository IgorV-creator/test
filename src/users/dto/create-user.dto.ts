import { ApiProperty } from "@nestjs/swagger";
import { IsString , Length, IsEmail} from 'class-validator'

// объект dto для обмена данными с БД (при создании Пользователя)
export class CreateUserDto {
    //@ApiProperty - Документируем в Swagger
    @ApiProperty({example: 'example@example.com', description: 'User email'})
    @IsEmail({}, {message: 'Некорректный адрес'})
    @IsString({message:" Должна быть строка"})
    readonly email: string;
    @ApiProperty({example: '123', description: 'User password'})
    @IsString({message:" Должна быть строка"})
    @Length(3, 16, {message: 'Длина не менее 3 и не более 16'})
    readonly password: string;
}