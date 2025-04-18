export interface Jogador {
    readonly _id?: string;
    nome: string;
    email: string;
    telefoneCelular: string;
    ranking:string;
    posicaoRanking:number
    urlFotoJogador:string;
}