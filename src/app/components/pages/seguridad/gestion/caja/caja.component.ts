import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../../../../services/core/registro/caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styles: [
  ]
})
export class CajaComponent implements OnInit {

  cajas:[] = [];

  constructor(private caja: CajaService) { }

  ngOnInit(): void {
    this.caja.listar().subscribe(res=>{
      this.cajas = res['cajas'];
    })
  }
 
}
