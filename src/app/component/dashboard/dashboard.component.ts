import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    console.log('getAllTask');
    this.crudService.getAllTasks().subscribe({
      next: (result) => (this.taskArr = result),
      error: (err) => {
        alert('Unable to get list of task');
      },
    });
  }

  addTask() {
    console.log('add Task');
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      error: (err) => {
        alert('unable to add task');
      },
    });
  }

  editTask() {
    console.log('editTask');
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert('Failed to edit task');
      },
    });
  }

  deleteTask(etask: Task) {
    console.log(etask.task_name);
    this.crudService.deleteTask(etask).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert('Failed to delete task');
      },
    });
  }

  call(etask: Task) {
    console.log(etask.task_name);
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
