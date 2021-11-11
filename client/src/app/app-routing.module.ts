import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { TaskFormComponent } from './views/task-form/task-form.component';
import { TaskListComponent } from './views/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'task', component: TaskListComponent },
  { path: 'task/new', component: TaskFormComponent },
  { path: 'task/edit/:id', component: TaskFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
