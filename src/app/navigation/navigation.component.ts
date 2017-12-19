import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Task } from '../task';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';

//call fake tasks
 // import { TASKS } from '../mock-task';

//call the service
import { TaskService} from '../task.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})


export class NavigationComponent implements OnInit {
//	tasks = TASKS;
tasks: Task[];
form: FormGroup;
payLoad = '';
  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.getTasks();
  }
  	getTasks(): void {
  		this.taskService.getTasks()
  			.subscribe(Tasks => this.tasks = Tasks);
  	}  

    onSubmit(name: string, body:string): void {
   let task: any = {
       _links: null,
       type: null,
       title: null,
       body: null     
    };
    
    task._links = {type: {"href": "http://drupal.dd:8083/rest/type/node/task"} };
    task.type = {target_id: "task"};
    task.title = {value: name};
    task.body = { "": body};
      
      this.taskService.addTask(task)
        .subscribe(task => {
          this.tasks.push(task);
          // console.log(JSON.stringify(task));    
        });
    }

   
    delete(task: Task): void {
      this.tasks = this.tasks.filter(h => h !== task);
      this.taskService.deleteTask(task).subscribe();
    }

}


