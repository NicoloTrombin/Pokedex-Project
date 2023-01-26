import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { AuthService } from '../service/auth.service';
import { PokemonsService } from '../service/pokemons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{

  pokemons!: Pokemon[];
  pokemonsChangedSubscribe!: Subscription;

  constructor(private pokemonsService: PokemonsService, private auth: AuthService ) {}
  
  ngOnDestroy(): void {
    this.pokemonsChangedSubscribe.unsubscribe();
  }
  
  ngOnInit(): void {
    this.pokemonsChangedSubscribe = this.pokemonsService.pokemonsChange.subscribe((nuoviPokemons) => {
      this.pokemons = nuoviPokemons;
    });
    
    this.pokemons = this.pokemonsService.getPokemons();
  }

  onClickDelete(id: number) {
    this.pokemonsService.deletePokemon(id);
  }

  logOut() {
    this.auth.signOut();
  } 


}
