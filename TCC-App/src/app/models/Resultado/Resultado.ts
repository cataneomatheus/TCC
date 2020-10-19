import { User } from '../User';
import { ExameResultado } from './ExameResultado';
import { PerguntaRespostaResultado } from './PerguntaRespostaResultado';

export class Resultado {
    id: number;
    dataHora: Date;
    alunoId: number;
    nomeAluno: string;
    professorId: number;
    nomeProfessor: string;
    hashLib: string;
    percAcertPergunta: number;
    percAcertExame: number;
    finalizado: boolean;
    nomePaciente: string;
    dataNascimento: Date;
    sexo: string;
    tipoAtendimento: string;
    queixaPrincipal: string;
    inicioSintomas: string;
    qtdMaxPergunta: number;    
    qtdMaxExame: number;    
    
    perguntaRespostasResultados: PerguntaRespostaResultado[];
    exameResultados: ExameResultado[];
}