import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  api = "https://api.github.com/users"
  

  userForm!: FormGroup;
  userSubmitted = false;

  // BUSCAR UN USUARIO POR NOMBRE DE USUARIO Y DEVUELVA =

  avatar = "";
  repositoriesTableList: Array<any> = [];

  repositoriesTableListName = ""
  repositoriesTableListDescription = ""
  repositoriesTableListLink = ""
  repositoriesTableListStars = ""
  repositoriesTableListLenguageProgramming = ""

  get userName() {
    return this.userForm.get('userName');
  }

  constructor(private readonly service: UserService) { }

  ngOnInit() {
    this.initUserForm();
  }

  private initUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    });
  }

  searchUser(form: FormGroup) {
    this.userSubmitted = true;
    if (form.valid) {
      this.service.searchUsers(form.value.userName).subscribe(data => {
        const a = data;
      });
    }
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
