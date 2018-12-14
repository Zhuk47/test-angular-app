import {Injectable} from '@angular/core';
import {Task} from './task';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const tasks = [
            {id: 1, name: 'Log-in', description: 'Log in to the system'},
            {id: 2, name: 'Working', description: 'Work on your\'s tickets'},
            {id: 3, name: 'Dinner', description: 'Take your dinner'},
            {id: 4, name: 'Completing', description: 'Complete your tickets'},
            {id: 5, name: 'Log-out', description: 'Log out from the system'},
        ];

        return {tasks};
    }

    // genId(tasks: Task[]): number {
    //     return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
    // }
}
