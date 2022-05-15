import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'

export interface VideoModal extends Base {}

export class VideoModal extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop({ unique: true })
	name: string

	@prop()
	password: string

	@prop()
	isPublic: string

	@prop({ default: 0 })
	views?: number

	@prop({ default: 0 })
	like?: number

	@prop({ default: 0 })
	dislike?: number

	@prop()
	descriptions: string

	@prop()
	location: string

	@prop()
	videoPath: string

	@prop()
	thumbnailPath: string
}
