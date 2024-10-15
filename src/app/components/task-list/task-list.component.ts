import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('taskAnimation', [
      transition('* => *', [
        // Animate tasks when entering (adding) them
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        // Animate tasks when leaving (removing) them
        query(':leave', [
          animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class TaskListComponent {
  tasks: Task[] = []; // Store task list
  newTaskTitle = ''; // For new task input
  darkMode = false; // To track dark mode status

  constructor(private taskService: TaskService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadTasks(); // Load tasks on initialization
  }

  // Load tasks from service
  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Toggle task completion status
  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTaskStatus(task).subscribe(() => {
      console.log(`Task ${task.id} status updated.`);
    });
  }

  // Add a new task to the task list
  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        completed: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = ''; // Clear input after adding
      this.taskService.saveTasks(this.tasks).subscribe(() => {
        this.toastr.success('New task added.');
      });
    }
  }

  deleteCompletedTasks() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.taskService.saveTasks(this.tasks).subscribe(() => {
      this.toastr.success('Completed tasks deleted.');
    });
  }

  // Toggle between Dark Mode and Light Mode
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const body = document.body;
    if (this.darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
}
