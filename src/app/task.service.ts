import {Injectable} from '@angular/core';
import {Task} from './task';
import {TASKS} from './mock-tasks';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    getTasks(): Observable<Task[]> {
        // TODO: send the message _after_ fetching the heroes
        this.messageService.add(`TaskService: fetched tasks`);
        return of(TASKS);
    }

    getTask(id: number): Observable<Task> {
        // TODO: send the message _after_ fetching the hero
        this.messageService.add(`TaskService: fetched task id = ${id}`);
        return of(TASKS.find(task => task.id === id));
    }

    constructor(private messageService: MessageService) {
    }
}
