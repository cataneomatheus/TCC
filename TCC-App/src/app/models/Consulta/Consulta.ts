import { Exame } from "./Exame";
import { PerguntaResposta } from "./PerguntaResposta";

export class Consulta {
    id: number;
    nomePaciente: string;
    dataNascimento: Date;
    sexo: string;
    tipoAtendimento: string;
    queixaPrincipal: string;
    inicioSintomas: string;
    exames: Exame[];
    perguntaRespostas: PerguntaResposta[];
}