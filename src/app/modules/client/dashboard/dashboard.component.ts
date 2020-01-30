import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { ProjectsService } from './../../../services/projects.service';
import { Project } from "../../../models/project.model"
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { TasksService}from './../../../services/tasks.service'
import { Task } from 'src/app/models/task.model';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data: Observable<any[]>;
  projects: Project[] = [];
  Tasks:Observable<Task[]>;
  arraylistid: String[] = [];
  arraynmbrtask:number[]=[];
  Taskarray:Task[]=[];
  valueBarschart: any;
  i : number=0;
  chartdata = null;
  ref =this.angularFirestore.firestore.collection('/projects/');


   @ViewChild("barCanvas", null) barCanvas: ElementRef;
  private barChart: Chart;
  constructor(
    // private storage: Storage,
   private projectservice: ProjectsService,
    private angularFirestore: AngularFirestore,
    private taskservice:TasksService

  ) { }

  getProjects():Observable<Project[]>{
    return this.projectservice.getProjects();
  }
    getId():String[]{
     this.projects.forEach(pro => {
      this.arraylistid.push(pro.id);
      });
      return this.arraylistid;
    }
    getnumbertaskbyproject():number[]{

      this.projects.forEach(pro => {
      this.taskservice.getTasksByProjectId(pro.id).subscribe( tasks=>{
        this.Taskarray=tasks as Task[]
      });
       this.arraynmbrtask[this.i]=this.Taskarray.length;
       this.i=this.i+1;
      });
     return this.arraynmbrtask;
    }

  ngOnInit() {
     console.log(this.arraynmbrtask.length);//to verifiy if the data have been retrieved
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        //labels: ["January", "February", "March", "April", "May", "June"],
        labels:this.getId(),
        datasets: [
          {
            label: "# task per Projects",
            //data: [12, 19, 3, 5, 2, 3],
            data:this.getnumbertaskbyproject(),
            //data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

  }
}
