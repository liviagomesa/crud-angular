import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  // Propriedades da classe do componente
  courseForm = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]], // já tipamos os campos do formulário aqui
    category: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder, // esta classe informa que os campos não podem ser nulos, mas poderíamos usar também apenas FormBuilder
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private currentRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const course: Course = this.currentRoute.snapshot.data['course']; // acessamos o curso retornado pelo resolver
    this.courseForm.setValue({_id: course._id, name: course.name, category: course.category}); // ajustando os valores do formulário conforme curso do resolver
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

  public getErrorMessage(fieldName: string) {
    const field = this.courseForm.get(fieldName);
    // a interrogação abstrai a checagem if field != null && (que precisa ser feita senão dá erro)
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo deve ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Tamanho máximo deve ser de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }

}
