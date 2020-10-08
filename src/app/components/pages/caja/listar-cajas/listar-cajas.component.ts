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

  constructor(
    private listarCajas: CierreCajaIndividualService
  ) { }

  ngOnInit(): void {
    this.listarCajas.getCajas().subscribe(res=>{
      this.cajas = res['cajas'];
      console.log(res);
    })

  }

}
