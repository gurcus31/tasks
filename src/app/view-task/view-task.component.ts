import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';



@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit  {
	@Input() task: Task;


	constructor(
// The ActivatedRoute holds information about the route to this instance of the Task detail component. 
	  private route: ActivatedRoute,
// The taskService gets task data from the remote server and this component will use it to get the task-to-display.
	  private taskService: TaskService,
// The location is an Angular service for interacting with the browser. 
	  private location: Location
	) {}

	ngOnInit(): void {
		// subscribe to the params, this change just the component if the url change. 
	  this.route.params.subscribe(
	      params => {
	          const id = +this.route.snapshot.paramMap.get('id')
	        	this.taskService.getTask(id)
	  			.subscribe(Task => this.task = Task);

	      }
	  );
	}
    

  goBack(): void {
    this.location.back();
  }
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
   task._links = {type: {"href": "http://drupal.dd:8083/rest/type/node/task"} };
   task.title = {value: name};
   task.body = { "": body};
   // console.log(JSON.stringify(task));
   // console.log(JSON.stringify(task.id));    
    
      this.taskService.updateTask(task, id)
            // .subscribe(() => this.goBack());
            .subscribe();
   }


}
