import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserModel } from '../user/user.modal'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from 'nestjs-typegoose'
import { AuthDto } from './auth.dto'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {}

	async registration(dto: AuthDto) {}

	async validationUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.UserModel.findOne({ email: dto.email })
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueAccessToken(userId: string) {
		const data = { _id: userId }
		return await this.jwtService.signAsync(data, { expiresIn: '31d' })
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email
		}
	}
}
