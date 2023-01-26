import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../model/pokemon';
import { AuthService } from '../service/auth.service';
import { PokemonsService } from '../service/pokemons.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

    isEditMode = false;
    idPokemonToModify = -1;
    
    constructor(private pokemonsService: PokemonsService, private router: Router, private activatedRoute: ActivatedRoute, private auth: AuthService) {}
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        const id: string | undefined = params['id'];

        if(id) {
          const idNumerico = +id;
          const pokemonToModify: Pokemon | undefined = this.pokemonsService.getPokemonById(idNumerico);

          if(pokemonToModify) {
            this.isEditMode = true;
            this.idPokemonToModify = idNumerico;

            this.form =  new FormGroup({
              nome: new FormControl(pokemonToModify.nome),
              urlImage: new FormControl(pokemonToModify.urlImage),
              dati: new FormGroup({
                altezza: new FormControl(pokemonToModify.dati.altezza),
                peso: new FormControl(pokemonToModify.dati.peso),
              }),
              stats: new FormGroup({
                hp: new FormControl(pokemonToModify.stats.hp),
                attacco: new FormControl(pokemonToModify.stats.attacco),
                difesa: new FormControl(pokemonToModify.stats.difesa),
                attaccoSp: new FormControl(pokemonToModify.stats.attaccoSp),
                difesaSp: new FormControl(pokemonToModify.stats.difesaSp),
                velocita: new FormControl(pokemonToModify.stats.velocita),
              }),
              tipi: new FormArray(pokemonToModify.tipi.map(tipi => {
                return new FormControl(tipi);
              })),
              abilita: new FormArray(pokemonToModify.abilita.map(abilita => new FormGroup({
                nome: new FormControl(abilita.nome),
                nascosta: new FormControl(abilita.nascosta),
              }))),
              mosse: new FormArray(pokemonToModify.mosse.map(mosse => new FormGroup({
                nome: new FormControl(mosse.nome),
                tipo: new FormControl(mosse.tipo),
              }))),
            });
          }
        }
      });
    }

    form: FormGroup = new FormGroup({
      nome: new FormControl(''),
      urlImage: new FormControl(''),
      dati: new FormGroup({
        altezza: new FormControl(''),
        peso: new FormControl(''),
      }),
      stats: new FormGroup({
        hp: new FormControl(''),
        attacco: new FormControl(''),
        difesa: new FormControl(''),
        attaccoSp: new FormControl(''),
        difesaSp: new FormControl(''),
        velocita: new FormControl(''),
      }),
      tipi: new FormArray([
        new FormControl(''),
      ]),
      abilita: new FormArray([
        new FormGroup({
          nome: new FormControl(''),
          nascosta: new FormControl(false),
        })
      ]),
      mosse: new FormArray([
        new FormGroup({
          nome: new FormControl(''),
          tipo: new FormControl(''),
        }),
      ]),
    });

    get tipiFormArray(): FormArray {
      return this.form.get('tipi') as FormArray;
    }

    get abilitaFormArray(): FormArray {
      return this.form.get('abilita') as FormArray;
    }

    get mosseFormArray(): FormArray {
      return this.form.get('mosse') as FormArray;
    }

    onAddTipi() {
      this.tipiFormArray.push(new FormControl());
    }

    onAddAbilita() {
      this.abilitaFormArray.push(new FormGroup({
        nome: new FormControl(),
        nascosta: new FormControl(false),
      }));
    }

    onAddMosse() {
      this.mosseFormArray.push(new FormGroup({
        nome: new FormControl(),
        tipo: new FormControl(),
      }));
    }

    onDeleteTipi(index: number) {
      this.tipiFormArray.removeAt(index);
    }

    onDeleteAbilita(index: number) {
      this.abilitaFormArray.removeAt(index);
    }

    onDeleteMosse(index: number) {
      this.mosseFormArray.removeAt(index);
    }

    onSubmit() {
      if(this.isEditMode) {
        this.pokemonsService.editPokemons(
          this.idPokemonToModify,
          this.form.value
        );

        this.isEditMode = false;
        this.idPokemonToModify = -1;
      }
      else {
        this.pokemonsService.addPokemon(this.form.value);
      }

       this.router.navigateByUrl('/list')
    }

    logOut() {
      this.auth.signOut();
    }

}

