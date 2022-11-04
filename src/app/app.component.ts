import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // api = "https://api.github.com/users"


  // userForm!: FormGroup;
  // userSubmitted: Boolean = false;

  // BUSCAR UN USUARIO POR NOMBRE DE USUARIO Y DEVUELVA =

  // userAvatar: string = "";
  // userFullName: string = "";
  // bio: string = "";

  // repositoryLength: number = 0;

  repositoryLength: number = 0;

  repositories: any = [];

  userSubmitted: any = false;

  // get userName() {
  //   return this.userForm.get('userName');
  // }

  constructor(
    // private readonly service: UserService
  ) { }

  ngOnInit() {
    // this.initUserForm();
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



  // private initUserForm() {
  //   this.userForm = new FormGroup({
  //     userName: new FormControl('', [
  //       Validators.required,
  //     ])
  //   });
  // }

  // searchUser(form: FormGroup) {
  //   this.userSubmitted = true;
  //   if (form.valid) {
  //     this.service.searchUsers(form.value.userName).subscribe({
  //       next: user => {
  //         console.log(
  //           "*** User found (Succes): The user", user.name
  //           , "with the id:", user.id
  //           , "and login like:", user.login
  //           , "was founded. ***"
  //         );
  //         this.userAvatar = user.avatar_url;
  //         this.userFullName = user.name;
  //         this.bio = user.bio;
  //         this.service.searchRepos(form.value.userName).subscribe({
  //           next: repositories => {
  //             this.repositories = repositories;
  //             this.repositoryLength = repositories.length;
  //             console.log(
  //               "The user", form.value.userName,
  //               "has", this.repositoryLength,
  //               "repositories");
  //           },
  //           error: error => {
  //             console.log("Error control (line 53 aprox): ", error);
  //           },
  //           complete: () => {
  //             console.log('The searchRepos method was completed');
  //           }
  //         });

  //       },
  //       error: error => {
  //         console.log("Error control (line 53 aprox): ", error);
  //       },
  //       complete: () => {
  //         console.log('The searchUsers method was completed');
  //       }
  //     })
  //   }
  // }

  // cleanSubmit() {
  //   this.userSubmitted = false;
  // }

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
