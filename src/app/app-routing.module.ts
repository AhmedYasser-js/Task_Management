import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent,title: 'Task List' },
  { path: 'tasks/:id', component: TaskItemComponent, title: 'Task Details' } // Route with task ID
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
