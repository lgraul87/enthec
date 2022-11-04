import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  repositoryLength: number = 0;
  repositories: any = [];
  userSubmitted: any = false;

  constructor() { }

  ngOnInit() {
  }

  repositorySize(event: any) {
    this.repositoryLength = event;
  }
  repositoryData(event: any) {
    this.repositories = event;
  }

  submitted(event: any) {
    this.userSubmitted = event;
  }

  // 1 - Realizar un input que busque por nombre de usuario y que renderice 
  // la biografía, el nombre y elavatar y una lista de los repositorios 
  // de ese usuario en una tabla.

  // 2 - Para cada repositorio que pinte los siguientes datos: nombre, descripción, un enlace al
  // repositorio, las estrellas y los lenguajes de programación.

  // 3 - Que las filas de la tabla se puedan ordenar por nombre del repositorio o por estrellas de forma
  // ascendente y descendente.

  // 4 - Que puedas buscar y que solo muestre los repositorios en el que nombre coincida con la
  // búsqueda.

  // 5 - Que se pueda filtrar por lenguaje(s) de programación y que solo aparezcan los repos con los
  // lenguajes seleccionados. En el wireframe se muestran HTML, CSS, Javascript, pero es un ejemplo
  // ya que esto debera variar en función de los lenguajes que utilizen los repos de la lista.

  // 6 - Opcional: Que cuando el usuario haga scroll se muestren mas repos (scroll infinito).
}
