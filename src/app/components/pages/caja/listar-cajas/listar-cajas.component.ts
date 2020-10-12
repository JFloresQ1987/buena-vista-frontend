import { Component, OnInit } from '@angular/core';
import { CierreCajaIndividualService } from '../../../../services/core/caja/cierre-caja-individual.service';

@Component({
  selector: 'app-listar-cajas',
  templateUrl: './listar-cajas.component.html',
  styles: [
  ]
})
export class ListarCajasComponent implements OnInit {

  cajas:[] = [];

  desde: string  = '1969-01-01' 
  hasta: string  = '2050-01-01' 

  constructor(
    private listarCajas: CierreCajaIndividualService
  ) { }

  ngOnInit(): void {
    this.listarCajas.getCajas(this.desde, this.hasta).subscribe(res=>{
      this.cajas = res['cajas'];
      console.log(res);
    })    
  }

  elegirFecha(desde: string, hasta: string){
    desde = this.desde
    hasta= this.hasta
    this.listarCajas.getCajas(desde, hasta).subscribe(res=>{
      this.cajas = res['cajas'];
      console.log(res);

    })
  }


}
