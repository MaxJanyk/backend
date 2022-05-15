import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModule } from '../user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from '../config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModule,
				schemaOptions: {
					collection: 'User'
				}
			}
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	]
})
export class AuthModule {}
