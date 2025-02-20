import { Location } from '@angular/common';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  // Propriedades da classe do componente
  courseForm = this.formBuilder.group({
    name: [''], // já tipamos os campos do formulário aqui
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder, // esta classe informa que os campos não podem ser nulos, mas poderíamos usar também apenas FormBuilder
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // o método value retorna um json com todos os campos e valores preenchidos no formulário
    // como save retorna um observable, é necessário se inscrever nele (subscribe)
    this.service.save(this.courseForm.value).subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', {duration: 5000});
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', '', {duration: 5000});
    this.location.back();
  }

}
