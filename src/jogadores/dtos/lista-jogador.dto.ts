import { CriarJogadorDto } from "./criar-jogador.dto";

export class ListaJogadorDto extends CriarJogadorDto {
    readonly _id?: string;
    readonly ranking?: string;
    readonly posicaoRanking?: number;
    readonly urlFotoJogador?: string;
    mensagem?: any;  
}