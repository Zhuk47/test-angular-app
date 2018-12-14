import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

    tasks: Task[];

    getTasks(): void {
        this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    }

    add(name: string, description: string): void {
        name = name.trim();
        description = description.trim();
        if (!name && !description) {
            return;
        }
        this.taskService.addTask({name, description} as Task).subscribe(task => {
            this.tasks.push(task);
        });
    }

    delete(task: Task): void {
        this.tasks = this.tasks.filter(t => t !== task);
        this.taskService.deleteTask(task).subscribe();
    }

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.getTasks();
    }

}
