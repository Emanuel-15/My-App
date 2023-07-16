import { NoopAnimationPlayer } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  value: any
  key: any
  index: any


  constructor(private storage: Storage) {
    this.init();
  }

  addTask(key: string, value: any) {
    this.storage.set(key, value);
  }

  deleteTask(key: string) {
    this.storage.remove(key);
  }

  updateTask(key: string, newValue: any) {
    this.storage.set(key, newValue);
    this.getAllTask();
  }

  getAllTask() {
    let task: any[] = [];
    this.storage.forEach((value, key, index) => {
      task.push({ 'key': key, 'value': value });
    });

    return task;
  }

  async init() {
    await this.storage.create();
  }
}