import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // Aqui só fica uma lista em branco, pois quem gera e passa para o componente a lista é o serviço
  courses: Course[] = [];
  displayedColumns = ['name', 'category'];

  // Estamos passando o CoursesService via construtor para que seja injetado automaticamente
  // (classes de serviço são sempre marcadas como @Injectable pelo Angular)
  constructor(private coursesService: CoursesService) {
    this.courses = this.coursesService.list();
  }

  ngOnInit(): void {
  }

}
