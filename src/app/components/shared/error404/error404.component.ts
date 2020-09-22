import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component {

  year = new Date().getFullYear();

  // public resultado: string = "";

  // ngOnInit(): void {

  //   let migracion = [];

  //   const data = this.getData();

  //   for (let i = 0; i < data.length; i++) {

  //     if (data[i].codigo_padre === 30009 || data[i].codigo_padre === 30008)
  //       migracion.push({
  //         codigo_anterior: data[i].codigo,
  //         abreviatura: data[i].abreviatura,
  //         descripcion: data[i].descripcion,
  //         sub_conceptos: [],
  //         es_ingreso: data[i].es_ingreso,
  //         es_vigente: data[i].es_vigente,
  //         es_borrado: data[i].es_borrado
  //       });
  //   }

  //   for (let j = 0; j < migracion.length; j++) {

  //     let sub_data = [];

  //     for (let i = 0; i < data.length; i++) {

  //       if (data[i].codigo_padre != 30009 && data[i].codigo_padre != 30008 &&
  //         migracion[j].codigo_anterior === data[i].codigo_padre)
  //         sub_data.push({
  //           // _id: this.getObjectId(),  
  //           _id: {
  //             "$oid": this.getObjectId()
  //           },
  //           codigo_anterior: data[i].codigo,
  //           abreviatura: data[i].abreviatura,
  //           descripcion: data[i].descripcion,
  //           es_vigente: data[i].es_vigente,
  //           es_borrado: data[i].es_borrado
  //         });
  //     }

  //     migracion[j].sub_conceptos = sub_data;

  //   }

  //   console.log(migracion)
  //   this.resultado = JSON.stringify(migracion);
  // }

  // getObjectId() {
  //   var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  //   return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
  //     return (Math.random() * 16 | 0).toString(16);
  //   }).toLowerCase();
  // };

  // getData() {

  //   return []
  // }
}
