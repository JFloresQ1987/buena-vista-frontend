import { Component, OnInit } from '@angular/core';

import { AnalistaService } from '../../../../../services/core/registro/analista.service';

@Component({
  selector: 'app-analista',
  templateUrl: './analista.component.html',
  styles: [
  ]
})
export class AnalistaComponent implements OnInit {

  analistas: [] = []

  constructor(private analistaService: AnalistaService) { }

  ngOnInit(): void {
    this.analistaService.listar().subscribe(res =>{
      this.analistas = res['analistas'];
    })
  }

}
