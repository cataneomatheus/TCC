import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.validation()
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.compararSenhas
      })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirmPassword');

    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({
        password: this.registerForm.get('passwords.password').value
      }, this.registerForm.value);
      
      this.authService.register(this.user).subscribe(
        () => {          
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro realizado');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Cadastro já existente');                
                break;
              case 'PasswordTooShort':
                this.toastr.error('Senha muito curta, use no mínimo 6 dígitos');                
                break;
              case 'PasswordRequiresNonAlphanumeric':
                this.toastr.error('A senha não contém letras.');                
                break;
              case 'PasswordRequiresDigit':
                this.toastr.error('A senha não contém dígitos números.');                
                break;
              case 'PasswordRequiresLower':
                this.toastr.error('A senha não contém letra minúscula.');                
                break;
              case 'PasswordRequiresUpper':
                this.toastr.error('A senha não contém letra maíuscula.');                
                break;
              default:
                this.toastr.error(`Erro no cadastro! CODE: ${element.code}`);                
                break;
            }
          });
        }
      )
    }
  }

}
