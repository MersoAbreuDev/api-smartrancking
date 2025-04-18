import { Document } from "mongoose";


export interface Jogador extends Document {
    nome: string;
    email: string;
    telefoneCelular: string;
    ranking:string;
    posicaoRanking:number
    urlFotoJogador:string;
}