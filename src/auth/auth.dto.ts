import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters!' })
	message: string

	@IsString()
	password: string
}
