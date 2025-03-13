import { Observable, of } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../model/course';
import { catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // Propriedades da classe (serão usadas no html)

  courses$: Observable<CoursePage> | null = null; // Aqui só fica nulo, pois quem gera e passa para o
  // componente a lista é o serviço ($ ao final como boa prática para informar que é um observable)

  // Captura a instância do componente MatPaginator que está no HTML, ou seja, o <mat-paginator>. O seletor do componente (mat-paginator) representa uma instância da classe MatPaginator.
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 5;

  // Estamos passando o CoursesService via construtor para que seja injetado automaticamente
  // (classes de serviço são sempre marcadas como @Injectable pelo Angular)
  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  // PageEvent é uma classe do Paginator que tem como propriedades: pageIndex (passamos 0), pageSize (passamos 5) e length (obtido no próprio HTML a partir do retorno do método do serviço, que consulta a API)
  // Demos valores padrões para que o refresh do construtor não precise de argumentos (o paginator inicializará com esses valores); o length será alterado no próprio HTML com o retorno da API antes da renderização
  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => { // em caso de erro no método
        this.onError('Erro ao carregar cursos.');
        return of({courses: [], totalElements: 0, totalPages: 0}); // retornar um observable que retorna um array vazio
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

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.currentRoute}) // Ao clicar no botão, o Angular vai pegar a rota atual (/courses) e agregar /new.
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.currentRoute})
  }

  onDelete(course: Course) {
    // O método open() do MatDialog recebe dois argumentos: a classe do componente do dialog e um objeto de
    // configuração, que aceita diversas propriedades, como width, height, disableClose (impede que o
    // usuário feche o dialog clicando fora dele) e data (um objeto qualquer que deseja passar para o
    // componente do dialog e do tipo informado no construtor do componente do dialog (no nosso, caso, string))
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza de que deseja excluir?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.delete(course._id).subscribe({
          next: () => { // necessário se inscrever no observable para o método funcionar
            this.refresh();
            this.snackBar.open('Curso removido com sucesso', 'X', { // o X é a action (sempre será fechar, poderia escrever outra coisa, como "close", "fechar", etc.)
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.onError("Erro ao tentar remover curso")
        });
      }
    });
  }

}
