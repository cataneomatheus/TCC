export class PerguntaRespostaResultado {
    id: number; 
    pergunta: string; 
    resposta: string; 
    certa: boolean;
    selecionada: boolean;

    constructor(){
        this.certa = false;
    }
}
