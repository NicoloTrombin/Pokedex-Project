import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../model/pokemon';
import { AuthService } from '../service/auth.service';
import { PokemonsService } from '../service/pokemons.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  pokemons?: Pokemon;

  constructor(private pokemonsService: PokemonsService, private activatedRoute: ActivatedRoute, private auth: AuthService) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
   
    this.pokemons = this.pokemonsService.getPokemonById(id);
   })
  }

  logOut() {
    this.auth.signOut();
  }
}
