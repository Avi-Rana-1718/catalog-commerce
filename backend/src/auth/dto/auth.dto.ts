import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class signUpDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string
}

export class signInDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}