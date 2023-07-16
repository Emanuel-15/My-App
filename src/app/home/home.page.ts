import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController} from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  todoList: any[] = []

  /*
   [{
     itemName: 'Programando',
     itemDeuDate: '12-07-2022',
     itemPriority: 'Alta',
     itemCategory: 'Proyectos'
   },
 
   {
     itemName: 'Diseñando',
     itemDeuDate: '12-07-2023',
     itemPriority: 'Baja',
     itemCategory: 'Diseños'
   },
 
   {
     itemName: 'Comprando',
     itemDeuDate: '11-07-2023',
     itemPriority: 'Intermedia',
     itemCategory: 'Personal'
   },
   ] 
   */


  today: number = Date.now();



  constructor(public modalCtrl: ModalController, 
              private alertController: AlertController,  
              private toastController: ToastController,  
              private socialSharing: SocialSharing,
              private platform: Platform,
              ) { }


  async AddTask() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });

    modal.onDidDismiss().then(newTaskObj => {
      //console.log(newTaskObj.data);
      this.todoList.push(newTaskObj.data)
    });

    return await modal.present();
  }


  async delete(index: number) {
  const confirmAlert = await this.alertController.create({
  header: 'Confirmar cancelar tarea',
  message: '¿Estás seguro de que deseas cancelar esta tarea?',
  buttons: [
  {
  text: 'Cancelar',
  role: 'cancel',
  handler: () => {
  this.mostrarMensaje("Tarea no cancelada")
  }
},
  {
  text: 'Aceptar',
  handler: () => {
  this.todoList.splice(index, 1);

  this.mostrarMensaje("Tarea Cancelada");
  }
  }
  ]
  });

  await confirmAlert.present();
  
  }

async completar(index: number) {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar completar tarea',
      message: '¿Estás seguro de que deseas completar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
            //console.log('Compleción de tarea cancelada');
            this.mostrarMensaje("Tarea Cancelada")
          }
        },
        {
          text: 'Completar',
          handler: () => {
            // Elimina la tarea de la lista cuando se completa
            this.delete(index);
            //console.log('Tarea completada con éxito');
            this.mostrarMensaje("Tarea completada");
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000, // Duración del mensaje en milisegundos (2 segundos en este caso)
      position: 'bottom' // Posición del mensaje en la pantalla (bottom, middle, top)
    });
    await toast.present();
  }


  compartirTarea(item: any) {
    const mensaje = `Tarea: ${item.nombreItem}\nFecha: ${item.fechaItem}`;

    if (this.platform.is('cordova')) {
      this.socialSharing.share(mensaje).then(() => {
        this.mostrarMensaje('Tarea compartida con éxito');
      }).catch((error) => {
        this.mostrarMensaje('Error al compartir la tarea');
        console.error(error); // Muestra el error en la consola para obtener más información
      });
    } else {
      this.mostrarMensaje('La función de compartir no está disponible en esta plataforma');
    }
  }




}

