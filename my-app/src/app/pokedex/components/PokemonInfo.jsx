'use client';

import { capitalize } from '@/app/utils/capitalize';

import React from 'react';
import Button from '@/app/components/Button';

import styles from '../styles/PokemonCard.module.css';

export default function PokemonInfoClient({ location, data }) {
	const region = location.pokedex_numbers[1].pokedex.name;
	const types = data.types.map((type) => type.type.name);
	console.log(types[0]);
	const statsArray = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`);

	const handleUpload = async () => {
		const pokemon = { pokemon_id: data.id, name: data.name };
		console.log('Uploading', pokemon);

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pokemon),
			});

			if (!response.ok) {
				throw new Error('Failed to upload');
			}

			const result = await response.json();
			console.log('Upload successful:', result);
		} catch (error) {
			console.error('Error uploading Pokemon:', error);
		}
	};

	const handleDelete = async () => {
		const pokemon = { pokemon_id: data.id };
		console.log('Deleting', pokemon);

		try {
			const response = await fetch('/api/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pokemon),
			});

			if (!response.ok) {
				console.log(response);
				throw new Error('Failed to delete');
			}

			const result = await response.json();
			console.log('Delete successful:', result);
		} catch (error) {
			console.error('Error deleting Pokemon:', error);
		}
	};

	return (
		<main>
			<div>
				<div className={styles[types[0]]}>
					<img
						src={data.sprites.other['official-artwork'].front_default}
						alt={data.name}
					/>
					<h1>{capitalize(data.name)}</h1>
				</div>
			</div>
			<Button href='/pokedex' />
			<div>Pokedex entry: {data.id}</div>
			<div>
				<div>Types:</div>
				{types.map((type) => (
					<div key={type} id='type'>
						{capitalize(type)}
					</div>
				))}
			</div>
			<div>
				{statsArray.map((stat, index) => (
					<div key={index}>{capitalize(stat)}</div>
				))}
			</div>
			<div>Region: {capitalize(region)}</div>
			<Button text='Upload Pokemon' onClick={handleUpload} />
			<Button text='Delete Pokemon' onClick={handleDelete} />
		</main>
	);
}
