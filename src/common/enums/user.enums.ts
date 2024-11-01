import { IsNumber, IsOptional, IsString } from "class-validator";

export class RoleDto {
    @IsString()
    @IsOptional()
    Role: string;

    @IsString()
    @IsOptional()
    gender: string;
}