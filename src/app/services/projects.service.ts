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

}
