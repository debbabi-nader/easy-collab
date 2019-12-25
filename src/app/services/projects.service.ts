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

    read_Projets() {
        return this.angularFirestore.collection('/projects/').valueChanges();
      }

    create_NewProjet(project) {
        project.id = this.angularFirestore.createId();
        return this.angularFirestore.doc<Project>('/projects/'+ project.id).set({ ...project });
      }
    
      update_Projet(projetID,projet){
        this.angularFirestore.doc('/projects/' + projetID).update(projet);
      }
     
      delete_Projet(projet_id) {
        this.angularFirestore.doc('/projects/' + projet_id).delete();
      }

}
