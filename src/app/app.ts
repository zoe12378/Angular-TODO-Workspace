import { Component, signal, computed,effect } from '@angular/core';
import { TodoHeader } from './todo-header/todo-header';
import { TodoList } from './todo-list/todo-list';
import { TODO, todoStatus } from './@models/todo.model'
import { TodoFooter } from './todo-footer/todo-footer';
import { TodoInput } from './todo-input/todo-input';


@Component({
  imports: [TodoHeader,TodoList,TodoFooter,TodoInput],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})


export class App {
  constructor(){
    effect(() =>{
      console.log("目前任務總數:",this.todoList().length);
    });
  }
  title = 'TODO';
  showHeader = true;
  todoList = signal<TODO[]>([]);
  nowStatus = signal<todoStatus>(todoStatus.All);
  todoStatus = todoStatus;
  nextId: number = 1;

  filterTodoList = computed(()=> {
    switch(this.nowStatus()){
      case todoStatus.All:
        return this.todoList();
      case todoStatus.Active:
        return this.todoList().filter(item => !item.completed);
      case todoStatus.Completed:
        return this.todoList().filter(item => item.completed);
      default:
        return this.todoList();
    }
  });

  activeCount = computed(() =>
    this.todoList().filter(item => !item.completed).length
  );

  completedCount = computed(() =>
    this.todoList().filter(item => item.completed).length
  );
  
  //要先確定陣列不為空，因為陣列為空，every出來也會是true
  get allCompleted(){
    return this.todoList().length !== 0 &&
      this.todoList().every(item => item.completed);
  }

  changeAllCheckbox(){
    const status = !this.allCompleted;
    this.todoList.update(list =>
      list.map(item => 
        ({... item, completed: status})
      )
    );
  }

  changeCheckbox(id: number){
    this.todoList.update(value =>
      value.map(item => 
      item.id === id 
      ? {... item, completed: !item.completed} 
      : item
    ));
  }

  changeStatus(status: todoStatus){
    this.nowStatus.set(status);
  }

  add(value: string){
    value = value.trim();
    if(value !== ""){
      this.todoList.update(current => [...current, {
        id: this.nextId,
        thing: value,
        completed: false,
        editing: false,
        oldthing: "",
      }]);
      this.nextId++;
    }else{
      console.log("任務不可為空");
      return;
    }
  }

  update(id: number, newValue: string) {
    if(newValue.trim() !== ""){
      this.todoList.update(list =>
        list.map(item => 
          item.id === id
          ? {...item, thing : newValue, oldthing: "", editing : false}
          : item
        )
      );
    }else{
      console.log("任務不可為空")
      return;
    }
  }

  cancelUpdate(id: number){
    this.todoList.update(list =>
      list.map(item =>
        item.id === id
        ? {...item, editing: false}
        : item
      )
    );
  }

  edit(id: number){
    this.todoList.update(list =>
      list.map(item =>
        item.id === id
        ? {...item, editing: true, oldthing: item.thing}
        : item
      )
    );
  }

  delete(id: number){
    this.todoList.update(item => 
      item.filter(item => item.id !== id)
    );
  }

  deleteCompleted(){
    this.todoList.update(item =>
      item.filter(item => !item.completed)
    );
  }


}


