import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root' // Indica que essa classe é injetável e está disponível no root (ou seja, em toda a aplicação)
})
export class CoursesService {

  // variável que guarda a URL do servidor que será requisitada. Enquanto não fazemos o servidor,
  // fizemos um arquivo json temporário representativo
  private readonly API = 'api/courses';

  // o httpClient é fornecido automaticamente para nós, pois a classe HttpClient (ver documentação do Angular)
  // também foi criada com @Injectable (injeção de dependências). Porém também é necessário importar o
  // módulo HttpClient globalmente (isto é, no app.module)
  // O objetivo do seu uso é fazer uma chamada à API Java futuramente para obter os dados dos cursos
  constructor(private httpClient: HttpClient) { }

  // Método para exportar a lista de cursos para o componente
  list(page = 0, pageSize = 5) {
    return this.httpClient.get<CoursePage>(this.API, { params: { page: page, pageSize: pageSize } })
    .pipe( // O pipe permite executar funções internas para tratar os dados obtidos com o get
      first(), // para encerrar a inscrição no observable assim que obtiver a primeira resposta
      // delay(2000), // método temporário para atrasar um pouco o retorno do servidor e conseguirmos visualizar o spinner de carregamento
      // tap(courses => console.log(courses)) // recebe uma lista de cursos e imprime no console, mas poderia fazer uma manipulação nesses dados
    );
  }

  save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
