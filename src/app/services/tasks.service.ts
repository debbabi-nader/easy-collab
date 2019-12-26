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

    createTask(task: Task) {

        task.id = this.angularFirestore.createId();

        return this.angularFirestore.doc<Task>('/tasks/' + task.id).set({ ...task });

    }

    updateTask(id: string, task: Task) {

        this.angularFirestore.doc<Task>('/tasks/' + id).update({ ...task });

    }

    deleteTask(id: string) {

        this.angularFirestore.doc<Task>('/tasks/' + id).delete();

    }

}
