import { 
  Component, 
  OnInit, 
  // ChangeDetectorRef,
  Input,
   } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Task } from '../task';
import { RouterModule, ActivatedRoute, Router} from '@angular/router';
import { AppComponent } from '../app.component';
import { TaskService} from '../task.service';
import { ViewTaskComponent } from '../view-task/view-task.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
tasks: Task[];
form: FormGroup;
payLoad = '';
urlId: number;
  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute, 
    // private cdRef: ChangeDetectorRef,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.getTasks();

    }
  

    getTasks(): void {  
      // this.taskService.getTasks()
      //   .subscribe(Tasks => this.tasks = Tasks);
      // emits a next value.
      this.taskService.getTasks()
          .subscribe(tasks => this.tasks = tasks);

  	}  

    onSubmit(name: string, body:string): void {
    name = name.trim();
    if (!name) { return; }    
    let task: any = {
       _links: null,
       type: null,
       title: null,
       body: null  
    };

    const url = `${this.taskService.mainUrl}/rest/type/node/task`;
    task._links = {type: {"href":url}};
    task.type = {target_id: "task"};
    task.title = {value: name};
    task.body = { "": body};
    // console.log(JSON.stringify(task));    
      this.taskService.addTask(task)
        .subscribe(task => {
          // console.log(JSON.stringify(this.tasks));
          this.getTasks();
         });

    }
    delete(task: Task): void {
      this.tasks = this.tasks.filter(h => h !== task);
      //we save the id , cuz after the delete function, we  gonna lose it
      const oldId = task.id;
      this.taskService.deleteTask(task)
        .subscribe(task => {
//we call the defaultId function from task.service. 
          this.taskService.defaultId
//here we are subscribed to the urlId, which give us the id from the view task         
            .subscribe(urlId => { 
              this.urlId = urlId ; 
                  if (oldId == urlId ) {
                    // Location.call('/home');
                    this.router.navigate(['/home']);
                  }  
            })
        })
    }
}

