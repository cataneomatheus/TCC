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
      queixaPrincipal: ['', [Validators.required, Validators.maxLength(500)]],
      inicioSintomas: ['', [Validators.required, Validators.maxLength(500)]],
      qtdMaxPergunta: [0, Validators.required],
      qtdMaxExame: [0, Validators.required],
      hashLib: [''],
      perguntaRespostas: this.fb.array([]),
      exames: this.fb.array([])
    });
  }

  criaExame(exame: any): FormGroup {
    return this.fb.group({
      id: [exame.id],
      nome: [exame.nome, Validators.required],
      imgExame: [exame.imgExame, Validators.required],
      certa: [exame.certa == null ? false : exame.certa]
    });
  }

  criaPerguntaResposta(perguntaResposta: any): FormGroup {
    return this.fb.group({
      id: [perguntaResposta.id],
      pergunta: [perguntaResposta.pergunta, Validators.required],
      resposta: [perguntaResposta.resposta, Validators.required],
      certa: [perguntaResposta.certa == null ? false : perguntaResposta.certa]
    });
  }

  carregarConsulta() {
    const idConsulta = +this.router.snapshot.paramMap.get('id');
    this.consultaService.getConsultaById(idConsulta)
      .subscribe(
        (consulta: Consulta) => {
          this.consulta = Object.assign({}, consulta);

          this.registerForm.patchValue(this.consulta);

          this.consulta.perguntaRespostas.forEach(perguntaResposta => {
            this.perguntaRespostas.push(this.criaPerguntaResposta(perguntaResposta));
          });

          this.consulta.exames.forEach(exame => {
            this.exames.push(this.criaExame(exame));
          });

          this.registerForm.patchValue(this.consulta);
        }
      );
  }

  adicionarPerguntaResposta() {
    this.perguntaRespostas.push(this.criaPerguntaResposta({ id: 0 }));
  }

  adicionarExame() {
    this.exames.push(this.criaExame({ id: 0 }));
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  removePerguntaResposta(id: number) {
    this.perguntaRespostas.removeAt(id);
  }

  removeExame(id: number) {
    this.exames.removeAt(id);
  }

  salvarConsulta() {
    this.consulta = Object.assign({ id: this.consulta.id }, this.registerForm.value);

    this.uploadImagem();

    this.consultaService.putConsulta(this.consulta).subscribe(
      () => {
        this.toastr.success('Editado consulta com sucesso');
      }, error => {
        this.toastr.error(`Erro ao editar consulta: ${error}`);
      }
    );
  }

  uploadImagem() {
    if (!this.file)
      return;

    this.consultaService.postUpload(this.file, this.fileNameToUpdate).
      subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
        }
      );
  }

  onFileChange(event: any, index: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files;
      this.exames.at(index).patchValue({
        imgExame: event.target.files[0].name
      });
    }
  }

  liberarSimulacao() {    
    this.consultaService.liberarSimulacao(this.consulta.id).subscribe(
      (consulta: Consulta) => {
        this.consulta.hashLib = consulta.hashLib;
        this.toastr.success('Liberada consulta para simulação com sucesso');
      }, error => {
        this.toastr.error(`Erro ao liberar consulta: ${error}`);
      }
    );
  }

  bloaquearSimulacao() {
    this.consultaService.bloquearSimulacao(this.consulta.id).subscribe(
      (consulta: Consulta) => {
        this.consulta.hashLib = consulta.hashLib;
        this.toastr.success('Bloqueio da consulta para simulação efetuado com sucesso');
      }, error => {
        this.toastr.error(`Erro ao bloquear consulta: ${error}`);
      }
    );
  }

  copiarCodigo() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.consulta.hashLib;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastr.success('Copiado código da consulta com sucesso');
  }

}
