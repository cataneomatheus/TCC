import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/models/Consulta/Consulta';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConsultaService } from 'src/app/services/Consulta/consulta.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultaEdit',
  templateUrl: './consultaEdit.component.html',
  styleUrls: ['./consultaEdit.component.css']
})
export class ConsultaEditComponent implements OnInit {

  titulo = 'Edição detalhada de consulta';
  consulta: Consulta = new Consulta();
  registerForm: FormGroup;
  file: File;
  fileNameToUpdate: string;
  dataAtual: string;

  get perguntaRespostas(): FormArray {
    return <FormArray>this.registerForm.get('perguntaRespostas');
  }

  get exames(): FormArray {
    return <FormArray>this.registerForm.get('exames');
  }

  constructor(
    private consultaService: ConsultaService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) {
    this.localeService.use('pt-br')
   }

  ngOnInit() {
    this.validation(),
    this.carregarConsulta()
  }

  validation() {
    this.registerForm = this.fb.group({
      nomePaciente: ['', [Validators.required, Validators.maxLength(50)]],
      sexo: ['', [Validators.required, Validators.maxLength(20)]],
      dataNascimento: ['', Validators.required],
      tipoAtendimento: ['', [Validators.required, Validators.maxLength(50)]],
      queixaPrincipal: ['', [Validators.required, Validators.maxLength(50)]],
      inicioSintomas: ['', [Validators.required, Validators.maxLength(50)]],
      perguntaRespostas: this.fb.array([]),
      exames: this.fb.array([])
    });
  }

  criaExame(exame: any): FormGroup {
    return this.fb.group({
      id: [exame.id],
      nome: [exame.nome, Validators.required],
      imgExame: [exame.imgExame, Validators.required]
    });
  }

  criaPerguntaResposta(perguntaResposta: any): FormGroup {
    return this.fb.group({
      id: [perguntaResposta.id],
      pergunta: [perguntaResposta.pergunta, Validators.required],
      resposta: [perguntaResposta.resposta, Validators.required]
    });
  }

  carregarConsulta() {
    const idConsulta = +this.router.snapshot.paramMap.get('id');
    this.consultaService.getConsultaById(idConsulta)
    .subscribe(
      (consulta: Consulta) => {
        this.consulta = Object.assign({}, consulta);
        debugger;
        this.consulta.exames.forEach(exame => {
          if(exame.imgExame.startsWith('C:\\')) {
            this.fileNameToUpdate =  exame.imgExame.split('\\', 3)[2];
            
          } else {
            this.fileNameToUpdate = exame.imgExame.toString();
          }
        });
        this.registerForm.patchValue(this.consulta);

        this.consulta.perguntaRespostas.forEach(perguntaResposta => {
          this.perguntaRespostas.push(this.criaPerguntaResposta(perguntaResposta));
        });

        this.consulta.exames.forEach(exame => {
          this.exames.push(this.criaExame(exame));
        });
      }
    );
  }

  adicionarPerguntaResposta() {
    this.perguntaRespostas.push(this.criaPerguntaResposta({id: 0}));
  }

  adicionarExame() {
    this.exames.push(this.criaExame({id: 0}));
  }

  removePerguntaResposta(id: number) {
    this.perguntaRespostas.removeAt(id);
  }

  removeExame(id: number) {
    this.exames.removeAt(id);
  }

  salvarConsulta() {
    this.consulta = Object.assign({ id: this.consulta.id }, this.registerForm.value);

    this.consulta.exames.forEach(exame => {
      if(exame.imgExame.startsWith('C:\\')) {
        const nomeArquivo = exame.imgExame.split('\\', 3);
        exame.imgExame = nomeArquivo[2];
        this.uploadImagem(this.file, nomeArquivo[2]);
        
      } else {
        exame.imgExame = this.fileNameToUpdate;
        this.uploadImagem(this.file, this.fileNameToUpdate);
      }
    });

    debugger;
    this.consultaService.putConsulta(this.consulta).subscribe(
      () => {
        this.toastr.success('Editado consulta com sucesso');
      }, error => {
        this.toastr.error(`Erro ao editar consulta: ${error}`);
      }
    );
  }

  uploadImagem(arquivo: File, nome: any) {
    debugger;
      this.consultaService.postUpload(arquivo, nome).
      subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
        }
      );
    }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      this.file = event.target.files;
    }
  }

}
