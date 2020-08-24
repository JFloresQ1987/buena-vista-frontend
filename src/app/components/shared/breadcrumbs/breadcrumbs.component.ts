import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public modulo: string;
  public menu: string;
  public item: string;
  public tituloSubs: Subscription;
  
  constructor(private router: Router) { 
    
    this.getArgumentosRuta();
    
    this.tituloSubs = this.getArgumentosRuta().subscribe( ({ modulo, menu, item }) => {
      
      this.modulo = modulo;
      this.menu = menu;
      this.item = item;
      document.title = `Buenavista - ${ item }`;
    })
  }  

  ngOnDestroy(): void {
    
    this.tituloSubs.unsubscribe();
  }

  getArgumentosRuta() {
    
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event: ActivationEnd ) => event.snapshot.data)
    );
  }
}
