import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router,
      private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.currentRoute}) // Ao clicar no botão, o Angular vai pegar a rota atual (/courses) e agregar /new.
  }

}
