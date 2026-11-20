import { Component, Input} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-todo-header',
  styleUrl: './todo-header.css',
  templateUrl: './todo-header.html',
})
export class TodoHeader{

  @Input({required:true}) title !: string;
  
}
