/*
  Ordine:
  1) Entro nella pagina ed ottengo la lista di nemici
  2) Capisco in qualche modo l'user autenticato quali nemici può affrontare
  3) Click sul nemico, se affrontabile transiziono a prossima schermata
  4) Click sul nemico, se non affrontabile mostro un messaggio riguardante il motivo
  Grafica:
  *Semplicissima grid con t: Nome, m: Immagine, b: Statistiche varie e/o drop
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-enemy',
  templateUrl: './pick-enemy.component.html',
  styleUrls: ['./pick-enemy.component.scss']
})
export class PickEnemyComponent implements OnInit {
  public Enemies: {}[] = [];

  constructor() { }

  ngOnInit(): void {
    this.Enemies.push({});
    this.Enemies.push({});
    this.Enemies.push({});
    this.Enemies.push({});
    this.Enemies.push({});
  }

}