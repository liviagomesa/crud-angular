import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Esse é o seletor que o Angular procura no index.html, onde temos
  // "<app-root></app-root>", o Angular substitui pelo app.component.html.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';
}
