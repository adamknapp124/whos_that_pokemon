'use client';

import React from 'react';
import Button from '@/app/components/Button';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function PokemonInfoClient({ location, data, selectedPokemon }) {
	const region = location.pokedex_numbers[1].pokedex.name;
	const types = data.types.map((type) => type.type.name);
	const statsArray = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`);
	// const bannerClass = styles[types[0]];

	// Upload info to database

	const handleUpload = (pokemon) => {
		console.log('Uploading', pokemon);
	};

	return (
		<main>
			<div>
				<img
					src={data.sprites.other['official-artwork'].front_default}
					alt={data.name}
				/>
				<h1>{capitalizeFirstLetter(data.name)}</h1>
			</div>
			<Button href='/' />
			<div>Pokedex entry: {data.id}</div>
			<div>
				<div>Types:</div>
				{types.map((type) => (
					<div key={type} id='type'>
						{capitalizeFirstLetter(type)}
					</div>
				))}
			</div>
			<div>
				{statsArray.map((stat, index) => (
					<div key={index}>{capitalizeFirstLetter(stat)}</div>
				))}
			</div>
			<div>Region: {capitalizeFirstLetter(region)}</div>
			<Button selectedPokemon={selectedPokemon} onClick={handleUpload} />
		</main>
	);
}
