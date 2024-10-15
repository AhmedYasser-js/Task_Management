import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    trigger('taskState', [
      state('normal', style({ transform: 'scale(1)' })),
      state('completed', style({ transform: 'scale(1.05)', opacity: 0.6 })),
      transition('normal <=> completed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<void>();

  // Define task state for animation
  get taskState() {
    return this.task.completed ? 'completed' : 'normal';
  }

  onToggle() {
    this.toggle.emit();
  }

}
