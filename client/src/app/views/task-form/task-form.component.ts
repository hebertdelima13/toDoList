
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/resources/models/task';
import { TaskService } from 'src/app/resources/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title: string = 'Nova tarefa';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getById(id).subscribe(task => {
        this.task = task;
        this.title = 'Alterando tarefa';
      });
    }
  }

  onSubmit() {
    this.taskService.save(this.task).subscribe(task => {
      console.log(task);
      this.router.navigate(['/task']);
    });
  }
}
