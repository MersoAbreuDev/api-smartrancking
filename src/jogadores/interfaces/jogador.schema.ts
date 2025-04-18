import mongoose from "mongoose";

export const JogadorSchema = new mongoose.Schema({
        nome: { type: String, required: true }, 
        telefoneCelular: { type: String, required: true }, 
        email: { type: String, unique: true, required: true }, 
        ranking: { type: String }, 
        posicaoRanking: { type: Number }, 
        urlFotoJogador: { type: String },
    }, { timestamps: true, collection: 'jogadores' });