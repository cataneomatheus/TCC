import { Exame } from "./Exame";
import { PerguntaResposta } from "./PerguntaResposta";

export class Consulta {
    id: number;
    userId: number;
    nomePaciente: string;
    dataNascimento: Date;
    sexo: string;
    tipoAtendimento: string;
    queixaPrincipal: string;
    inicioSintomas: string;    
    qtdMaxPergunta: number;    
    qtdMaxExame: number;    
    hashLib: string;    
    exames: Exame[];
    perguntaRespostas: PerguntaResposta[];
}