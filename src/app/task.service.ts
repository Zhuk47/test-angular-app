import {Injectable} from '@angular/core';
import {Task} from './task';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    private tasksUrl = 'api/tasks';

    private log(message: string) {
        this.messageService.add(`TaskService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getTasks(): Observable<Task[]> {
        // TODO: send the message _after_ fetching the heroes
        // this.messageService.add(`TaskService: fetched tasks`);
        return this.http.get<Task[]>(this.tasksUrl).pipe(
            tap(_ => this.log('fetched tasks')),
            catchError(this.handleError('getTasks', []))
        );
    }

    getTask(id: number): Observable<Task> {
        // TODO: send the message _after_ fetching the hero
        // this.messageService.add(`TaskService: fetched task id = ${id}`);
        const url = `${this.tasksUrl}/${id}`;
        return this.http.get<Task>(url).pipe(
            tap(_ => this.log(`fetched task id = ${id}`)),
            catchError(this.handleError<Task>(`getTask id = ${id}`))
        );
    }

    updateTask(task: Task): Observable<any> {
        return this.http.put(this.tasksUrl, task, httpOptions).pipe(
            tap(_ => this.log(`updated hero id = ${task.id}`)),
            catchError(this.handleError<any>('updateTask'))
        );
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
            tap((task: Task) => this.log(`added task w/ id = ${task.id}`)),
            catchError(this.handleError<Task>('addTask'))
        );
    }

    deleteTask(task: Task | number): Observable<Task> {
        const id = typeof task === 'number' ? task : task.id;
        const url = `${this.tasksUrl}/${id}`;

        return this.http.delete<Task>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted task id = ${id}`)),
            catchError(this.handleError<Task>('deleteTask'))
        );
    }

    searchTasks(term: string): Observable<Task[]> {
        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<Task[]>(`${this.tasksUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Task[]>('searchHeroes', []))
        );
    }

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {
    }
}
