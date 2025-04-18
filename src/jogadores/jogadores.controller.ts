import { Body, Controller, Get, Post, NotFoundException, InternalServerErrorException, Delete, Query, Put, Param } from '@nestjs/common';
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
                id: jogador.id,
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

    @Delete('deletar/:id')
    async deleteJogador(@Param('id') id: string) {
        try {
            const jogadorId =  this.jogadorService.getJogadorById(id);
            if (!jogadorId) {
                throw new NotFoundException('Jogador não encontrado');
            }
            await this.jogadorService.deletar((await jogadorId).id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException('Erro ao deletar jogador');
        }
    }

    @Put('atualizar/:id')
    async atualizarJogador(
        @Param('id') id: string, 
        @Body() jogadorRequest: Jogador
    ) {
        try {
            console.log("Corpo da requisição:", jogadorRequest);
            console.log("ID do jogador:", id);
            const jogador = await this.jogadorService.getJogadorById(id);
            if (!jogador) {
                throw new NotFoundException('Jogador não encontrado');
            }
            const jogadorAtualizado = await this.jogadorService.atualizar(id, jogadorRequest);
            return {
                mensagem: 'Jogador atualizado com sucesso',
                jogador: {
                    nome: jogadorAtualizado.nome,
                    telefoneCelular: jogadorAtualizado.telefoneCelular,
                    email: jogadorAtualizado.email,
                },
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException('Erro ao atualizar jogador');
        }
    }
}