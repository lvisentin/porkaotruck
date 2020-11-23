import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PorkaoResponse, UserEnderecoResponse } from 'src/app/interfaces/response.model';
import { UserEndereco } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.page.html',
  styleUrls: ['./enderecos.page.scss'],
})
export class EnderecosPage implements OnInit, OnDestroy {

  public enderecos: Array<UserEndereco>;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getEnderecosUsuario();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  getEnderecosUsuario() {
    this.userService.getEnderecosByUsuario()
      .pipe(takeUntil(this.destroy))
      .subscribe((userEnderecosResponse: UserEnderecoResponse) => {
        this.enderecos = userEnderecosResponse.data;
        console.log('enderecos', this.enderecos );
      })
  }
  
  deleteEndereco(id) {
    this.userService.deleteUsuarioEndereco(id)
      .pipe(takeUntil(this.destroy))
      .subscribe((response) => {
        console.log('response', response)
      })
  }
  
  async removerEndereco(endereco) {
    if(this.enderecos.length == 1) {
      this.presentAlertUniqueEndereco();
    } else {
      this.presentAlertConfirm(endereco);
    }
  }

  async presentAlertUniqueEndereco() {
    const alert = await this.alertController.create({
      header: 'Ocorreu um erro',
      message: 'Você não pode remover seu único endereço.',
      buttons: ['OK']

    });
    await alert.present();
  }

  async presentAlertConfirm(endereco) {
    const alert = await this.alertController.create({
      header: 'Remover endereco',
      message: `Deseja remover o endereco ${endereco.endereco.rua}, ${endereco.endereco.numero} ?`,
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          this.alertController.dismiss()
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.deleteEndereco(endereco.id);
        }
      }]

    });
    await alert.present();
  }
}
