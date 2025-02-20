import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CourseResolver } from './guards/course.resolver';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'new', component: CourseFormComponent, resolve: { course: CourseResolver } },
  // o método resolve do CourseResolver será executado e injeta o retorno (Observable de nome course) no
  // objeto de dados da rota, que o componente pode acessar logo depois via currentRoute.snapshot.data['course'];
  { path: 'edit/:id', component: CourseFormComponent, resolve: { course: CourseResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
