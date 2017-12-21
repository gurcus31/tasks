import { 
  Component, 
  OnInit, 
  // ChangeDetectorRef,
  Input
   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { NavigationComponent } from '../navigation/navigation.component'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit  {
	@Input() task: Task;
  urlId: number;
  // id : number;
  public getId () {
    const id = +this.route.snapshot.paramMap.get('id');
    return id
    }

	constructor(
	  private route: ActivatedRoute,
	  private taskService: TaskService,
	  // private Ref: ChangeDetectorRef,
    private location: Location
	) {}

	ngOnInit(): void {
   this.viewTask();
	}
    


  viewTask (): void {
        this.route.params.subscribe(
        params => {
          const id = +this.getId ();            
          this.taskService.newId(id)
             //console.log (id);
            this.taskService.getTask(id)
          .subscribe(Task => this.task = Task);
        }
    );
  }
  // goBack(): void {
  //   this.location.back();
  // }
  save(name: string, body:string): void {
     // let tasks: any = {_links: null}; tasks._links = {type: ...};
    let task: any = {
        _links: null,
        nid: null,
        title: null,
        body: null     
     };
     const id = +this.route.snapshot.paramMap.get('id')
     task.nid = {"": id};
     const url = `${this.taskService.mainUrl}/rest/type/node/task`;
     task._links = {type: {"href":url}};
     task.title = {value: name};
     task.body = { "": body};
     // console.log(JSON.stringify(task));
     // console.log(JSON.stringify(task.id));    
      
        this.taskService.updateTask(task, id)

   }
   


}
