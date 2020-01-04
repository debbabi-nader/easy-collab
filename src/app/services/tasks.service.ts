import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Task } from './../models/task.model';


@Injectable()
export class TasksService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {}

    getTaskById(id: string): Observable<Task> {

        return this.angularFirestore.doc<Task>('/tasks/' + id).valueChanges();

    }

    getTasksByProjectId(id: string): Observable<Task[]> {

        return this.angularFirestore.collection<Task>('/tasks', ref => ref.where('projectId', '==', id)).valueChanges();

    }

    addTask(task: Task) {

        task.id = this.angularFirestore.createId();
        return this.angularFirestore.doc<Task>('/tache/'+task.id ).set({ ...task });
      }

      async create_Newtask2(task : any) {
        return this.angularFirestore.collection("tache").add(task);
      }

      update_Task(tacheID, task) {
        this.angularFirestore.doc('/tasks/' + tacheID).update({ ...task });
      }
    
      delete_Task(tache_id) {
        this.angularFirestore.doc('/tasks/' + tache_id).delete();
      }  

}
