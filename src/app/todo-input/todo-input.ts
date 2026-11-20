import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  imports: [],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css',
})
export class TodoInput {
  @Output() addTodo = new EventEmitter<string>();

  onAdd(value:string): boolean{
    if(value.trim() !== ""){
      this.addTodo.emit(value);
      return true;
    }else{
      console.log("任務不可為空");
      return false;
    }
  }
}
