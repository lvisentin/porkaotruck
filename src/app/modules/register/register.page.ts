import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private destroy: Subject<boolean> = new Subject<boolean>();

  public registerForm = this.formBuilder.group({
    nome: [{value: null, disabled: false, }, Validators.required],
    email: [{value: null, disabled: false, }, Validators.required],
    senha: [{value: null, disabled: false, }, Validators.required],
    confirmacao_senha: [{value: null, disabled: false, }, Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading-register',
      message: 'Criando usuário...',
    });

    return loading.present();
  }

  onSubmit() {
    this.presentLoading();
    console.log(this.registerForm)
    const userObj = {
      name: this.registerForm.controls.nome.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.senha.value,
      password_confirmation: this.registerForm.controls.confirmacao_senha.value,
    }
    
    this.userService
      .register(userObj)
      .pipe(takeUntil(this.destroy))
      .subscribe((registerResponse) => {
        this.loadingController.dismiss();
        this.presentAlertSuccess();
        this.router.navigate(['login']);
        console.log(registerResponse)
      }, (err) => {
        this.loadingController.dismiss();
        err.message ? this.presentAlertError(err.message)
                    : this.presentAlertError('Ocorreu um erro, tente novamente mais tarde');
      })
  }

  async presentAlertSuccess(ev: any = null) {
    const alert = await this.alertController.create({
      header: 'Usuário registrado',
      message: 'Sua conta foi criada com sucesso, você pode logar agora.',
      buttons: ['OK']

    });
    await alert.present();
  }
 
  async presentAlertError(msg: string) {
    const alert = await this.alertController.create({
      header: 'Ocorreu um erro',
      message: msg,
      buttons: ['OK']

    });
    await alert.present();
  }
 
}
