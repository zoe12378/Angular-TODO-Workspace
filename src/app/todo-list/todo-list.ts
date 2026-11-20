import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { TODO } from '../@models/todo.model';

@Component({
  imports: [TodoItem],
  selector: 'app-todo-list',
  styleUrl: './todo-list.css',
  templateUrl: './todo-list.html',
})
export class TodoList {
  @Input({required:true})todoList!: TODO[];
  @Input() allCompleted = <boolean>(false);

  @Output() toggleTodo = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() changeAllCheckbox = new EventEmitter<void>();
  @Output() updateTodo = new EventEmitter<{id:number,value:string}>();
  @Output() cancelUpdateTodo = new EventEmitter<number>();
  @Output() editTodo = new EventEmitter<number>();


  onToggle(id: number){
    this.toggleTodo.emit(id);
  }
  onDelete(id: number){
    this.deleteTodo.emit(id);
  }
  onChangeAllCheckbox(){
    this.changeAllCheckbox.emit();
  }
  onUpdate(id:number, value:string){
    this.updateTodo.emit({id,value});
  }
  onCancelUpdate(id: number){
    this.cancelUpdateTodo.emit(id);
  }
  onEdit(id: number){
    this.editTodo.emit(id);
  }
}
