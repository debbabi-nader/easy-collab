import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Project } from './../models/project.model';


@Injectable()
export class ProjectsService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {}

    getProjectById(id: string): Observable<Project> {

        return this.angularFirestore.doc<Project>('/projects/' + id).valueChanges();

    }

    getProjects(): Observable<Project[]> {

        return this.angularFirestore.collection<Project>('/projects').valueChanges();

    }

    getProjectsByOwnerId(id: string): Observable<Project[]> {

        return this.angularFirestore.collection<Project>('/projects', ref => ref.where('ownerId', '==', id)).valueChanges();

    }

    addProject(project: Project) {

        project.id = this.angularFirestore.createId();

        return this.angularFirestore.doc<Project>('/projects/' + project.id).set({ ...project });

    }

    updateProject(id: string, project: Project) {

        this.angularFirestore.doc<Project>('/projects/' + id).update({ ...project });

    }

    deleteProject(id: string) {

        this.angularFirestore.doc<Project>('/projects/' + id).delete();

    }

}
