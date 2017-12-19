import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
	tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {

  }


 //  	// response to a click event
	// add(name: string): void {
	// 	// clear the input field 
	//   name = name.trim();
	//   if (!name) { return; }
	//   // When the given name is non-blank... 
	//   this.taskService.addTask({ name } as Task)
	//     .subscribe(Task => {
	//       this.tasks.push(Task);
	//     });
	//      // .subscribe(task => console.log(task));

	// }



  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }

}
