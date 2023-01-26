export interface Pokemon {
    id: number;
    nome: string;
    urlImage: string;
    dati: DatiPokemon;
    stats: StatsBasi;
    tipi: string[];
    abilita: Abilita[];
    mosse: Mossa[];
}

export interface DatiPokemon {
    altezza: number;
    peso: number;
}

export interface StatsBasi {
    hp: number;
    attacco: number;
    difesa: number;
    attaccoSp: number;
    difesaSp: number;
    velocita: number;
}

export interface Abilita {
    nome: string;
    nascosta: boolean;
}

export interface Mossa {
    nome: string;
    tipo: string;
}