'use client';

import { useState } from 'react';

import styles from './pokegrid.module.css';

export default function PokemonCard({ poke }) {
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const handleCardClick = (name) => {
		setSelectedPokemon(name);
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}

	return (
		<a
			href={`/pokemon/${selectedPokemon}`}
			onClick={() => handleCardClick(poke.name)}>
			<div className={styles.pokeChild}>
				<div className={styles.shader}></div>
				<img src={poke.url} alt='pokemon' className={styles.img} />
				<p className={styles.body}>{capitalizeFirstLetter(poke.name)}</p>
			</div>
		</a>
	);
}

// https://pokeapi.co/api/v2/pokemon-species/1/ - species info endpoint
// https://pokeapi.co/api/v2/location/1/ - region info endpoint
// https://pokeapi.co/api/v2/pokedex/1/ - pokedex info endpoint
