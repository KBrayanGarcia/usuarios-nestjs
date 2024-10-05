import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    password: string;
}