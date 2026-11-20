import { Component, EventEmitter, Input, Output } from '@angular/core';
import { todoStatus } from '../@models/todo.model';

@Component({
  selector: 'app-todo-footer',
  imports: [],
  templateUrl: './todo-footer.html',
  styleUrl: './todo-footer.css',
})
export class TodoFooter {
  todoStatus = todoStatus
  @Input({required:true}) nowStatus !: todoStatus;
  @Input({required:true}) completedCount !: number;
  @Input({required:true}) activeCount !: number;
  @Output() statusChange = new EventEmitter<todoStatus>();
  @Output() deleteCompleted = new EventEmitter<void>();
  
  onStatusChange(status: todoStatus){
    this.statusChange.emit(status);
  }
  onDeleteCompleted(){
    this.deleteCompleted.emit();
  }

}
