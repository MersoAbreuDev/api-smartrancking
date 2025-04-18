import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import * as uuid from 'uuid';


@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(
        private readonly logger: Logger
    ) {
        this.logger = new Logger(JogadoresService.name);
    }
    
    async createOrUpdateJogador(jogadorDTO: CriarJogadorDto): Promise<void>{
        await this.criar(jogadorDTO);
    }

    private criar(jogadorDTO: CriarJogadorDto): void {
       const {nome, telefoneCelular, email } = jogadorDTO;
        const jogadorEncontrado =  this.jogadores.find((jogador) => jogador.email === email);
        if (jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, jogadorDTO);
        }

       const jogador: Jogador = {
            _id:uuid.v4(),
            nome,
            telefoneCelular,
            email,
            ranking:'A',
            posicaoRanking:3,
            urlFotoJogador:'https://www.smartrancking.com.br/assets/img/sem-foto.png'
        };
        this.jogadores.push(jogador);
        
    }

    public getAllJogadores(){
        const jogadores = this.jogadores.map((jogador) => {
            return {
                _id: jogador._id,
                nome: jogador.nome,
                telefoneCelular: jogador.telefoneCelular,
                email: jogador.email,
                ranking: jogador.ranking,
                posicaoRanking: jogador.posicaoRanking,
                urlFotoJogador: jogador.urlFotoJogador
            };
        });  
        return jogadores;
    }

    public getJogadorByEmail(email: string): Jogador | undefined {
        return this.jogadores.find((jogador) => jogador.email === email);
    }

    public atualizar(jogadorEncontrado: Jogador, jogadorDTO: CriarJogadorDto):void {
        const { nome, telefoneCelular, email } = jogadorDTO;
        jogadorEncontrado.nome = nome;
        jogadorEncontrado.telefoneCelular = telefoneCelular;
        jogadorEncontrado.email = email;
    }

    public deletar(jogador: Jogador): void {
        const index = this.jogadores.indexOf(jogador);
        if (index > -1) {
            this.jogadores.splice(index, 1);
        }
    }
}
