import { Task } from '../models/task';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const AUTH_API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class TaskService { 

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Task[]>(`${AUTH_API}task`);
  }

  getById(id: string) {
    return this.http.get<Task>(`${AUTH_API}task/${id}`);
  }

  save(task: Task) {
    const taskBody = {
      description: task.description,
      completed: task.completed
    };

    if (task._id) {
      return this.http.put<Task>(`${AUTH_API}task/${task._id}`, taskBody);
    } else {
      return this.http.post<Task>(`${AUTH_API}task`, taskBody);
    }
  }

  delete(id: string) {
    return this.http.delete<Task>(`${AUTH_API}task/${id}`);    
  }

}
