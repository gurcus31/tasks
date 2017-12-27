import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Task } from './task';

import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../environments/environment';

// The heroes web API expects a special header in HTTP save requests. 
// That header is in the httpOption constant defined in the HeroService.
//Get the token at https://example.com/rest/session/token

// const httpHaljson = {
//   headers: new HttpHeaders({ 
//   "X-CSRF-Token": "Qfnczb1SUnvOAsEy0A_xuGp_rkompgO2oTkCBOSEItM",
//   "Authorization": "Basic Qfnczb1SUnvOAsEy0A_xuGp_rkompgO2oTkCBOSEItM", // encoded user/pass - this is admin/123qwe
//   // "Content-Type": "application/json"
//   "Content-Type": "application/hal+json"
//   })
// };

const httpHaljson = environment.httpHaljson;


@Injectable()
export class TaskService {
  public mainUrl = environment.mainUrl;
  // public mainUrl = 'http://drupal.dd:8083'

  private noId = new BehaviorSubject<number>(0);
  defaultId = this.noId.asObservable();

  // public taskList = new BehaviorSubject ([]);
  // firstList = this.taskList.asObservable();

  private tasks = new BehaviorSubject([]);
  private taskList: Task[];


constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

//this newId function is getting the ID from the url of the view-task component. 
  newId(urlId) {
    this.noId.next(urlId);
    // console.log (urlId);
  }
//this taskCall function is filling the taskList array with an updated service. 
  // tasksCall(newTasks){
  //   this.taskList.next(newTasks);
  // }
  getTasks() {
      if (!this.taskList || this.taskList.length === 0) {
          this.initializeTasks();
      }
      return this.tasks.asObservable();
  }


  	initializeTasks(){
      const url = `${this.mainUrl}/tasks`;
  	        // console.log (url);       
      const bla = this.http.get<Task[]>(url);
      // console.log(JSON.stringify(bla));    

      const blaa = bla.subscribe (tasks => {               
                   this.tasks.next(tasks);
              });
      return blaa;

            // .pipe(
            // tap(tasks => this.log(`fetched tasks`)),  
            //   catchError(this.handleError('initializeTasks', []))
            // ); 
       
  	}
//   getTasks(): Observable<Task[]> {
//           const url = `${this.mainUrl}/tasks`;
//         return this.http.get<Task[]>(url)
//         .pipe(
//         tap(tasks => this.log(`fetched tasks`)),    
//           catchError(this.handleError('getTasks', []))
//         ); 
    /** PUT: update the task on the server */

    updateTask (task: Task, id)/*: Observable<any> */{
      const url = `${this.mainUrl}/node/${id}`; 
      console.log (url);       
      return this.http.patch(url, task, httpHaljson)
          .subscribe(resp => {
            this.initializeTasks()
          });
        // .pipe(
        //   tap(_ => this.log(`updated task id=${id}`)),
        //   catchError(this.handleError<any>('updateTask'))
        // );
    }

/** GET task by id. Will 404 if id not found */
getTask(id: number): Observable<Task> {
  const url = `${this.mainUrl}/tasks/${id}`;
        console.log (url);       

  const returnGet = this.http.get<Task>(url);
  return returnGet
  .pipe(
        map(tasks => tasks[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),    
    catchError(this.handleError<Task>(`getTask id=${id}`))
  );
}


/** POST: add a new hero to the server */
/* HeroService.addHero() differs from updateHero in two ways.
  *- it calls HttpClient.post() instead of put().
  *- it expects the server to generates an id for the new hero, which it returns 
  *  in the Observable<Hero> to the caller. */
addTask (task: Task): Observable<Task> {
  const url = `${this.mainUrl}/entity/node`;  
  // console.log(JSON.stringify(task));    
  console.log (url);
  const postReturn = this.http.post(url, task, httpHaljson);
  // console.log(JSON.stringify(postReturn));  
  return postReturn 
  .pipe( 
    tap((task: Task) => this.log(`added task w/ id=${task.id}`)),
    catchError(this.handleError<Task>('addtask'))
  );
}



/** DELETE: delete the task from the server */
deleteTask (task: Task | number): Observable<Task> {
  const id = typeof task === 'number' ? task : task.id;
  const url = `${this.mainUrl}/node/${id}`;
      console.log (url);       

  return this.http.delete<Task>(url, httpHaljson).pipe(
    tap(_ => this.log(`deleted task id=${id}`)),
    catchError(this.handleError<Task>('deleteHero'))
  );
}


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}

