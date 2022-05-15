import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from 'nestjs-typegoose'
import { UserModule } from '../../user/user.module'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(UserModule) private readonly UserModal: ModelType<UserModule>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	// @ts-ignore
	async validate({ _id }: Pick<UserModule, '_id'>) {
		return this.UserModal.findById(_id).exec()
	}
}
