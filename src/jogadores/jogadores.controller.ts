import { Body, Controller, Get, Post, NotFoundException, InternalServerErrorException, Delete } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ListaJogadorDto } from './dtos/lista-jogador.dto';

@Controller('jogadores')
export class JogadoresController {
    constructor(private readonly jogadorService: JogadoresService) {}

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        try {
            await this.jogadorService.createOrUpdateJogador(criarJogadorDto);
            return {
                mensagem: 'Jogador criado com sucesso',
                jogador: {
                    nome: criarJogadorDto.nome,
                    telefoneCelular: criarJogadorDto.telefoneCelular,
                    email: criarJogadorDto.email,
                },
            };
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar jogador');
        }
    }

    @Get()
    async handleGet(): Promise<ListaJogadorDto[]> {
        try {
            const jogadores = await this.jogadorService.getAllJogadores();
            if (!jogadores || jogadores.length === 0) {
                throw new NotFoundException('Não há jogadores registrados');
            }
            return jogadores.map((jogador) => ({
                _id: jogador._id,
                nome: jogador.nome,
                telefoneCelular: jogador.telefoneCelular,
                email: jogador.email,
                ranking: jogador.ranking,
                posicaoRanking: jogador.posicaoRanking,
                urlFotoJogador: jogador.urlFotoJogador,
            }));
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException('Erro inesperado ao buscar jogadores');
        }
    }

    @Post('findByEmail')
    async getJogadorByEmail(@Body() jogadorRequest: Jogador) {
        try {
            const jogador = await this.jogadorService.getJogadorByEmail(jogadorRequest.email);
            if (!jogador) {
                throw new NotFoundException('Jogador não encontrado');
            }
            return {
                _id: jogador._id,
                nome: jogador.nome,
                telefoneCelular: jogador.telefoneCelular,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException('Erro ao buscar jogador');
        }
    }

    @Delete()
    async deleteJogador(@Body() jogadorRequest: Jogador) {
        try {
            const jogador =  this.jogadorService.getJogadorByEmail(jogadorRequest.email);
            if (!jogador) {
                throw new NotFoundException('Jogador não encontrado');
            }
            await this.jogadorService.deletar(jogador);
            return {
                mensagem: 'Jogador deletado com sucesso',
                jogador: {
                    nome: jogador.nome,
                    telefoneCelular: jogador.telefoneCelular,
                    email: jogador.email,
                },
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException('Erro ao deletar jogador');
        }
    }
}