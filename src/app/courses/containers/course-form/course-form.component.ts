import { FormUtilsService } from './../../../shared/form/form-utils.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  // Propriedades da classe do componente
  courseForm!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder, // esta classe informa que os campos não podem ser nulos, mas poderíamos usar também apenas FormBuilder
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private currentRoute: ActivatedRoute,
    public formUtils: FormUtilsService // Publico para conseguirmos acessar no html
  ) {
  }

  ngOnInit(): void {
    const course: Course = this.currentRoute.snapshot.data['course']; // acessamos o curso retornado pelo resolver
    this.courseForm = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)]], // já tipamos os campos do formulário aqui
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required) // Um FormArray composto de FormGroups
    });
  }

  // O cadastro de cada lição é como um "mini formulário" na página, abaixo dos demais campos do curso
  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)]]
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(l => lessons.push(this.createLesson(l)));
    }
    else {
      lessons.push(this.createLesson());
    }
    return lessons; // Retorna um FormGroup
  }

  // Retorna uma lista de AbstractControl (elementos do FormArray) (podem ser convertidos para FormGroup)
  getLessonsFormArray() {
    return (<UntypedFormArray>this.courseForm.get('lessons')).controls;
  }

  addNewLesson() {
    // O método get() do FormGroup retorna um AbstractControl | null, então há erro se tentarmos usar .push().
    // Para resolver, convertemos para UntypedFormArray.
    const lessons = this.courseForm.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.courseForm.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      // o método value retorna um json com todos os campos e valores preenchidos no formulário
      // como save retorna um observable, é necessário se inscrever nele (subscribe)
      this.service.save(this.courseForm.value).subscribe(result => this.onSuccess(), error => this.onError());
    } else {
      this.formUtils.validateAllFormFields(this.courseForm);
    }
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
