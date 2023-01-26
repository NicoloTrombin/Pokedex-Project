import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Pokemon } from "../model/pokemon";

@Injectable ({providedIn: 'root'})
export class PokemonsService {

    private pokemons: Pokemon[] = [
        {
            id: 1,
            nome:'Delibird',
            urlImage: 'https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/delibird.gif',
            dati: {
                altezza: 0.9,
                peso: 16,
            },
            stats: {
                hp: 45,
                attacco: 55,
                difesa: 45,
                attaccoSp: 65,
                difesaSp: 45,
                velocita: 75,
            },
            tipi: ['Ghiaccio', 'Volante'],
            abilita: [
            {
                nome:'Insonnia',
                nascosta: true,
            },
            {
                nome: 'Tuttafretta',
                nascosta: false,
            },
            {
                nome: 'Spiritovivo',
                nascosta: false,
            }
            ],
            mosse: [{
               nome: 'Regalino',
               tipo: 'Normale',
            },
            {
                nome: 'Perforbecco',
                tipo: 'Volante',
            }
            ],
        },
        {
            id: 2,
            nome:'Zangoose',
            urlImage: 'https://www.shinyhunters.com/images/regular/335.gif',
            dati: {
                altezza: 1.3,
                peso: 40,
            },
            stats: {
                hp: 73,
                attacco: 115,
                difesa: 60,
                attaccoSp: 60,
                difesaSp: 60,
                velocita: 90,
            },
            tipi: ['Normale'],
            abilita: [{
                nome:'Immunità',
                nascosta: false,
            },
            {
                nome: 'Velenimpeto',
                nascosta: true,
            },
            ],
            mosse: [{
               nome: 'Danzaspada',
               tipo: 'Normale',
            },
            {
                nome: 'Zuffa',
                tipo: 'Lotta',
            }
            ],
        },
    ];

    private lastId = 3;

    pokemonsChange = new Subject<Pokemon[]>();

    getPokemons() {
        return this.pokemons.slice();
    }

    addPokemon( pokemon : Omit<Pokemon, 'id'> ) {
        const newPokemon : Pokemon = {
            id: this.lastId++,
            ...pokemon,
        }

        this.pokemons.push(newPokemon);
    }

    getPokemonById(id: number) {
        return this.pokemons.find(p => p.id === id);
    }

    deletePokemon(id: number) {
        this.pokemons = this.pokemons.filter(p => p.id != id);

        this.pokemonsChange.next(this.pokemons.slice());
    }

    editPokemons(id: number, modifiedPokemon: Omit<Pokemon, "id">) {
        const index = this.pokemons.findIndex(p => p.id === id);

        if(index > -1) {
            this.pokemons[index] = {
                id, 
                ...modifiedPokemon,
            };
        }
    }
}