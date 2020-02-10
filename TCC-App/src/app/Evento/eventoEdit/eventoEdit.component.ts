import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventoedit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {

  titulo = 'Editar evento';
  evento: Evento =  new Evento();
  imagemURL = 'assets/img/upload.png'
  registerForm: FormGroup;
  fileNameToUpdate: string;
  dataAtual: ''

  get lotes(): FormArray {
    return <FormArray>this.registerForm.get('lotes');
  }

  get redesSociais(): FormArray {
    return <FormArray>this.registerForm.get('redesSociais');
  }

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute
    ) {
      this.localeService.use('pt-br')
    }

    ngOnInit() {
      this.validation(),
      this.carregarEvento()
    }

    carregarEvento() {
      const idEvento = +this.router.snapshot.paramMap.get('id');
      this.eventoService.getEventoById(idEvento).subscribe(
        (evento: Evento) => {
          this.evento = Object.assign({}, evento);
          this.fileNameToUpdate = evento.imagemURL.toString();
          this.imagemURL = 'http://localhost:5000/resources/images/${this.evento.imagemURL}?_ts=${this.dataAtual}'
          this.evento.imagemURL = '';
          this.registerForm.patchValue(this.evento);
        }
      )
    }

    validation() {
      this.registerForm = this.fb.group({
        tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        local: ['', Validators.required],
        dataEvento: ['', Validators.required],
        qtdPessoas: ['', [Validators.required, Validators.minLength(1)]],
        imagemURL: [''],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        lotes: this.fb.array([this.criaLote()]),
        redesSociais: this.fb.array([this.criaRedesSociais()])
      });
    }    

    criaLote(): FormGroup {
      return this.fb.group({
        nome: ['', Validators.required ],
        quantidade: ['', Validators.required ],
        preco: ['', Validators.required ],
        dataInicio: [''],
        dataFim: ['']
      })
    }

    criaRedesSociais(): FormGroup {
      return this.fb.group({
        nome: ['', Validators.required ],
        url: ['', Validators.required ]
      })
    }

    adicionarLote() {
      this.lotes.push(this.criaLote());
    }

    adicionarRedeSocial() {
      this.redesSociais.push(this.criaRedesSociais());
    }

    removerRedeSocial(id: number) {
      this.redesSociais.removeAt(id);
    }

    removerLote(id: number) {
      this.lotes.removeAt(id);
    }

    onFileChange(file: FileList) {
      const reader = new FileReader();

      reader.onload = (event: any) => this.imagemURL = event.target.result;
      reader.readAsDataURL(file[0]);
    }

}
