import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {



  categorias: any = []

  newTaskObj: any
  NombreTarea: any
  FechaTarea: any
  PrioridadTarea: any
  CategoriaTarea: any

  taskObject: any

  constructor(public modalCtrl: ModalController, public todoService: TodoService) { }

  ngOnInit() {
    this.categorias.push('Trabajo')
    this.categorias.push('Personal')
    this.categorias.push('Hogar')
  }

  async dismis() {
    await this.modalCtrl.dismiss(this.taskObject)
  }


  categoriaSeleccionada(index: number) {
    this.CategoriaTarea = this.categorias[index]
    // this.itemCategory = this.categorias[index]
  }

  adicionarTarea() {
    this.taskObject = ({
      nombreItem: this.NombreTarea,
      fechaItem: this.FechaTarea,
      prioridadItem: this.PrioridadTarea,
      categoriaItem: this.CategoriaTarea
    })

    this.dismis()
  }

}
