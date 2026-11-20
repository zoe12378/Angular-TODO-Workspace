import { Component,EventEmitter,Input,Output } from '@angular/core';
import { TODO } from '../@models/todo.model';

@Component({
  imports: [],
  selector: 'app-todo-item',
  styleUrl: './todo-item.css',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  @Input({ required: true }) todo!: TODO;
  @Output() toggleTodo = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() updateTodo = new EventEmitter<{id:number,value:string}>();
  @Output() cancelUpdateTodo = new EventEmitter<number>();
  @Output() editTodo = new EventEmitter<number>();

  
  onToggle(){
    this.toggleTodo.emit(this.todo.id);
  }
  onDelete(){
    this.deleteTodo.emit(this.todo.id);
  }
  onUpdate(id:number, value:string){
    this.updateTodo.emit({id,value});
  }
  onCancelUpdate(){
    this.cancelUpdateTodo.emit(this.todo.id);
  }
  onEdit(){
    this.editTodo.emit(this.todo.id);
  }
}
