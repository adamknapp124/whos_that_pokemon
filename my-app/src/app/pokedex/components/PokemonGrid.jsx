'use client';

import { useState } from 'react';
import PokemonCard from './PokemonCard';
import { getPokeData } from '@/app/api/Pokemons/route';

import styles from '../styles/PokemonGrid.module.css';
import DropBox from './DropBox';

const PokemonGrid = ({ pokemon, captured, onDropPokemon }) => {
	const [droppedPokeName1, setDroppedPokeName1] = useState('');
	const [droppedPokeName2, setDroppedPokeName2] = useState('');
	const [droppedPokemon1, setDroppedPokemon1] = useState(null);
	const [droppedPokemon2, setDroppedPokemon2] = useState(null);

	const handleDrop1 = async (pokeName) => {
		console.log(pokeName);
		setDroppedPokeName1(pokeName);
		const data = await getPokeData(pokeName);
		setDroppedPokemon1(data);

		await fetch('/api/updateDropped', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ droppedPokeName: pokeName }),
		});
	};
	const handleDrop2 = async (pokeName) => {
		console.log(pokeName);
		setDroppedPokeName2(pokeName);
		const data = await getPokeData(pokeName);
		setDroppedPokemon2(data);

		await fetch('/api/updateDropped', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ droppedPokeName: pokeName }),
		});
	};

	const handleDropEvent1 = (e) => {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		const draggedElement = document.getElementById(data);

		if (draggedElement) {
			const pokeName = draggedElement.id;
			handleDrop1(pokeName);
		}
	};
	const handleDropEvent2 = (e) => {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		const draggedElement = document.getElementById(data);

		if (draggedElement) {
			const pokeName = draggedElement.id;
			handleDrop2(pokeName);
		}
	};

	function handleDragOver(e) {
		e.preventDefault();
	}

	function handleOnDrag(e) {
		const pokeName = e.target.id;
		e.dataTransfer.setData('text/plain', pokeName);
	}

	const capturedPokemonNames = new Map(captured.map((mon) => [mon.name, mon.type]));

	return (
		<main className={styles.main}>
			<DropBox
				pokeName={droppedPokeName1}
				handleDrop={handleDropEvent1}
				handleDragOver={handleDragOver}
				droppedPokemon={droppedPokemon1}
			/>
			<section className={styles.center}>
				{pokemon.map((poke, index) => (
					<PokemonCard
						poke={poke}
						key={index}
						isCaptured={capturedPokemonNames.has(poke.name)}
						type={capturedPokemonNames.get(poke.name)}
						handleOnDrag={handleOnDrag}
					/>
				))}
			</section>
			<DropBox
				pokeName={droppedPokeName2}
				handleDrop={handleDropEvent2}
				handleDragOver={handleDragOver}
				droppedPokemon={droppedPokemon2}
			/>
		</main>
	);
};

export default PokemonGrid;
