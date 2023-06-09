import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PongModule } from './pong/pong.module';
import { MessagingModule } from './messaging/messaging.module';
import { FriendsModule } from './friends/friends.module';
import { TwoFactorAuthModule } from './auth/twoFactorAuthentication.module';
import { StatusModule } from './status/status.module';


@Module({
  imports: [UserModule, DatabaseModule, AuthModule, TwoFactorAuthModule, PongModule, FriendsModule, MessagingModule, StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
