import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { UserModule } from '../user/user.module'
import { VideoModal } from '../video/video.modal'

export interface CommentModal extends Base {}

export class CommentModal extends TimeStamps {
	@prop({ ref: () => UserModule })
	user: Ref<UserModule>

	@prop({ ref: () => VideoModal })
	video: Ref<VideoModal>[]

	@prop()
	message: string
}
