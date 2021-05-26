import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'examen';
  public iden: any = ""
  name: string = ""
  email: string = ""
  isEdit: boolean = false
  userObj: any=[{
    id:'',
    name:'',
    email:''
  }]

  usuarios:any=[]

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _http: HttpClient){}

  ngOnInit(){

    this._http.get("https://jsonplaceholder.typicode.com/users")
    .subscribe(datos=>{
      console.warn(datos);
      this.usuarios = datos;
    })
  }

  borrar(usuario:any=[]) {  
    this._http.delete("https://jsonplaceholder.typicode.com/users" + '/' + usuario.id)  
      .subscribe(response => {  
        let index = this.usuarios.indexOf(usuario);  
        this.usuarios.splice(index, 1);  
      });  
  }

  submit(data:any[]){
    console.log(data);
    this._http.post("https://jsonplaceholder.typicode.com/users", JSON.stringify(data))
    .subscribe(response => {
      this.usuarios.splice(0, 0, data);  
    });
    console.log(this.usuarios);
  }

  update(data:any[]) { 
    this.isEdit = true;
    this.userObj = data;
    this.iden = this.userObj.id; 
    /*
    console.log(ide)
    this._http.patch("https://jsonplaceholder.typicode.com/users" + '/' + ide, JSON.stringify({ isRead: true }))  
      .subscribe(response => {  
        console.log(response);  
      });  
      */
  }  

  updateUser(){
    this.isEdit = !this.isEdit;
    this._http.patch("https://jsonplaceholder.typicode.com/users" + '/' + this.iden, JSON.stringify({ isRead: true }))  
      .subscribe(response => {  
        console.log(response);  
      }); 
      this.userObj = "" 
  }
  

}
