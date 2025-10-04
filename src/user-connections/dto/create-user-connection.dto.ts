import { IsString, IsObject } from 'class-validator';

export class CreateUserConnectionDto {
  @IsObject()
  dbConfig: object;

  @IsString()
  dbPassword: string;
}