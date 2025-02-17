import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Indica que essa classe é injetável e está disponível no root (ou seja, em toda a aplicação)
})
export class CoursesService {

  // variável que guarda a URL do servidor que será requisitada. Enquanto não fazemos o servidor,
  // fizemos um arquivo json temporário representativo
  private readonly API = '/assets/courses.json';

  // o httpClient é fornecido automaticamente para nós, pois a classe HttpClient (ver documentação do Angular)
  // também foi criada com @Injectable (injeção de dependências). Porém também é necessário importar o
  // módulo HttpClient globalmente (isto é, no app.module)
  // O objetivo do seu uso é fazer uma chamada à API Java futuramente para obter os dados dos cursos
  constructor(private httpClient: HttpClient) { }

  // Método para exportar a lista de cursos para o componente
  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe( // O pipe permite executar funções internas para tratar os dados obtidos com o get
      first(), // para encerrar a inscrição no servidor assim que obtiver a primeira resposta
      tap(courses => console.log(courses)) // recebe uma lista de cursos e imprime no console, mas poderia fazer uma manipulação nesses dados
    );
  }
}
