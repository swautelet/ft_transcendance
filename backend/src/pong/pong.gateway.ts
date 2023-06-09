import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsException } from '@nestjs/websockets';
import { PongService, matchdata, ScoreProps, PaddleMove, handshake, playpause } from './pong.service';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway( { namespace:'/play', cors: true })
export class PongGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	// server
	@WebSocketServer() server: Server;

	constructor(private readonly pongService: PongService) {}
	async handleConnection(client: any, ...args: any[]) {
		await this.pongService.login(client, this.server);
	}
	handleDisconnect(client: any) {
		this.pongService.logout(client, this.server);
		this.pongService.desidentifiate(client.id);
	}
	afterInit(server: any) {
	}
	@SubscribeMessage('playPong')
	async playPong(client: any, data: playpause) {
		this.pongService.play(client, data);
	}
	@SubscribeMessage('stopPong')
	async stopPong(client: any, data: playpause){
		this.pongService.pause(client, data);
	}
	@SubscribeMessage('updatePaddle')
	async updatepaddle(client:any, data: PaddleMove){
		this.pongService.paddelupdate(client, data);
	}
	@SubscribeMessage('handshake')
	async handshake(client:any, data: any){
		const uid = client.id;
  		const users = ['user1', 'user2', 'user3'];
		const shake: handshake = {
			uid : uid,
			users: users,
			data: '',
		}
  		client.emit('handshake-response', shake);
	}
	@SubscribeMessage('find_match')
	async find_match(client: any, data: boolean) {
		this.pongService.find_match(client, data, this.server);
	}
	@SubscribeMessage('create_room')
	async create_room(client: any, data: boolean) {
		this.pongService.create_room(client, data, this.server);
	}
	@SubscribeMessage('join_room')
	async join_room(client: any, data: string) {
		this.pongService.join_room(client, data, this.server);
	}
	@SubscribeMessage('rematch')
	async rematch(client: any, data: string){
		this.pongService.rematch(client, data);
	}
	@SubscribeMessage('quit')
	async quit(client: any, data: string){
		this.pongService.logout(client, this.server);
		
	}
}