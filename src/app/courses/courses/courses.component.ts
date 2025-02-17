import { Observable, of } from 'rxjs';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // Aqui só fica uma lista em branco, pois quem gera e passa para o componente a lista é o serviço ($ ao final como boa prática para informar que é um observable)
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  // Estamos passando o CoursesService via construtor para que seja injetado automaticamente
  // (classes de serviço são sempre marcadas como @Injectable pelo Angular)
  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => { // em caso de erro no método
        this.onError('Erro ao carregar cursos.');
        return of([]); // retornar um observable que retorna um array vazio
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  ngOnInit(): void {
  }

}
