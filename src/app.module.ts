import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongodb+srv://emerson:WpdgokFi2SKXhDah@nestjscourse.yg6geb0.mongodb.net/?retryWrites=true&w=majority&appName=NestJsCourse',
    { }), 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
