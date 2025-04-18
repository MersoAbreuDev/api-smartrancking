import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];
    constructor(
        private readonly logger: Logger,
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
    ) {
        this.logger = new Logger(JogadoresService.name);
    }
    
    async createOrUpdateJogador(jogadorDTO: CriarJogadorDto): Promise<void>{
        await this.criar(jogadorDTO);
    }

    async criar(jogadorDTO: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(jogadorDTO);
        return await jogadorCriado.save();
    }

    async getAllJogadores() {
        const jogadores = await this.jogadorModel.find().exec();
        if (!jogadores || jogadores.length === 0) {
            throw new NotFoundException('Não há jogadores registrados');
        }
        return jogadores.map(jogador => ({ 
            id: jogador._id,
            nome: jogador.nome,
            telefoneCelular: jogador.telefoneCelular,
            email: jogador.email,
            ranking: jogador.ranking,
            posicaoRanking: jogador.posicaoRanking,
            urlFotoJogador: jogador.urlFotoJogador,
        }));
    }

    async getJogadorById(id: string): Promise<Jogador> {
        console.log('ID recebido:', id); // Log do ID recebido
      const jogadorEncontrado = await this.jogadorModel.findById(id).exec();
        console.log('Jogador encontrado:', jogadorEncontrado); 
         if (!jogadorEncontrado) {
              throw new NotFoundException(`Jogador com email ${id} não encontrado`);
         }
        return jogadorEncontrado;
    }

    async getJogadorByEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
           if (!jogadorEncontrado) {
                throw new NotFoundException(`Jogador com email ${email} não encontrado`);
           }
          return jogadorEncontrado;
      }

    async atualizar(id:string, jogadorDTO: CriarJogadorDto):Promise<Jogador> {
       const updatedJogador = await this.jogadorModel.findByIdAndUpdate(id, jogadorDTO, { new: true });
       if (!updatedJogador) {
           throw new NotFoundException(`Jogador with email ${id} not found`);
       }
       return updatedJogador;
    }

    public deletar(id:string): void {
        this.jogadorModel.findByIdAndDelete(id).exec()
    }
}
