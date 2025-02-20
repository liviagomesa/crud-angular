import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> { // Esta interface exige a implementação do método resolve() que retorna um Observable<Course>

  constructor(private service: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> { // route é um objeto que tem informações da rota atual e a compara com a rota definida em courses-routing.module.ts. Assim, consegue descobrir se for passado algum parâmetro de URL ou parâmetros de consulta, por exemplo.
    if (route.params && route.params['id']) { // se a rota atual tiver parâmetros e tiver o parâmetro :id
      return this.service.loadById(route.params['id']);
    }
    // caso seja a rota de criação de curso, isto é, não tem parâmetro id
    return of({_id: '', name: '', category: ''});
  }
}
