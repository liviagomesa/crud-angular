import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Indica que essa classe é injetável e está disponível no root (ou seja, em toda a aplicação)
})
export class CoursesService {

  // o httpClient é fornecido automaticamente para nós, pois a classe HttpClient (ver documentação do Angular)
  // também foi criada com @Injectable (injeção de dependências). Porém também é necessário importar o
  // módulo HttpClient globalmente (isto é, no app.module)
  // O objetivo do seu uso é fazer uma chamada à API Java futuramente para obter os dados dos cursos
  constructor(private httpClient: HttpClient) { }

  // Método para exportar a lista de cursos para o componente

  list(): Course[] {
    return [
      {_id: '1', name: 'Angular', category: 'front-end'}
    ];
  }
}
