import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'assets/mock-tasks.json'; // Path to the mock tasks file
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // Fetch tasks from the mock-tasks.json file
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      map((tasks) => tasks || []), // Ensure tasks array is returned
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  // Update the status of a task (completed or not completed)
  updateTaskStatus(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`; // Mocking URL for the example
    return this.http.put<Task>(url, task, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTaskStatus'))
    );
  }


  // Save new or updated tasks
  saveTasks(tasks: Task[]): Observable<Task[]> {
    // Simulate save with the current tasks array
    return of(tasks).pipe(
      catchError(this.handleError<Task[]>('saveTasks', tasks))
    );
  }

  // Handle errors in HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log the error for debugging
      return of(result as T); // Let the app keep running by returning an empty result
    };
  }
}
