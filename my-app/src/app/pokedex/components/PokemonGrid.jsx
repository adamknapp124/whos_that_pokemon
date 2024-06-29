'use client';

import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { getPokeData } from '@/app/api/Pokemons/route';
import { capitalize } from '@/app/utils/capitalize';

import styles from '../styles/PokemonGrid.module.css';
import DropBox from './DropBox';
import StatsGraph from './StatsGraph';

const PokemonGrid = ({ pokemon, captured }) => {
	const [droppedPokeName1, setDroppedPokeName1] = useState('');
	const [droppedPokeName2, setDroppedPokeName2] = useState('');
	const [droppedPokemon1, setDroppedPokemon1] = useState(null);
	const [droppedPokemon2, setDroppedPokemon2] = useState(null);
	const [stats1, setStats1] = useState({
		hp: null,
		attack: null,
		defense: null,
		specialAttack: null,
		specialDefense: null,
		speed: null,
	});
	const [stats2, setStats2] = useState({
		hp: null,
		attack: null,
		defense: null,
		specialAttack: null,
		specialDefense: null,
		speed: null,
	});
	const [barLengths, setBarLengths] = useState({
		hp: { p1: null, p2: null },
		attack: { p1: null, p2: null },
		defense: { p1: null, p2: null },
		specialAttack: { p1: null, p2: null },
		specialDefense: { p1: null, p2: null },
		speed: { p1: null, p2: null },
	});

	const handleDrop1 = async (pokeName) => {
		setDroppedPokeName1(pokeName);
		const data = await getPokeData(pokeName);
		const newStats = {
			hp: data.stats[0].base_stat,
			attack: data.stats[1].base_stat,
			defense: data.stats[2].base_stat,
			specialAttack: data.stats[3].base_stat,
			specialDefense: data.stats[4].base_stat,
			speed: data.stats[5].base_stat,
		};
		setStats1(newStats);
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
		setDroppedPokeName2(pokeName);
		const data = await getPokeData(pokeName);
		const newStats = {
			hp: data.stats[0].base_stat,
			attack: data.stats[1].base_stat,
			defense: data.stats[2].base_stat,
			specialAttack: data.stats[3].base_stat,
			specialDefense: data.stats[4].base_stat,
			speed: data.stats[5].base_stat,
		};
		setStats2(newStats);
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

	const calculateBarLength = (stat1, stat2) => {
		const total = stat1 + stat2;
		return {
			p1: (stat1 / total) * 100,
			p2: (stat2 / total) * 100,
		};
	};

	useEffect(() => {
		const newBarLengths = {
			hp: calculateBarLength(stats1.hp, stats2.hp),
			attack: calculateBarLength(stats1.attack, stats2.attack),
			defense: calculateBarLength(stats1.defense, stats2.defense),
			specialAttack: calculateBarLength(stats1.specialAttack, stats2.specialAttack),
			specialDefense: calculateBarLength(
				stats1.specialDefense,
				stats2.specialDefense
			),
			speed: calculateBarLength(stats1.speed, stats2.speed),
		};
		setBarLengths(newBarLengths);
	}, [stats1, stats2]);

	const capturedPokemonNames = new Map(captured.map((mon) => [mon.name, mon.type]));

	return (
		<main className={styles.main}>
			<div className={styles.pokeBox}>
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
			</div>
			<StatsGraph
				droppedPokemon1={droppedPokemon1}
				droppedPokemon2={droppedPokemon2}
				barLengths={barLengths}
				stats1={stats1}
				stats2={stats2}
			/>
		</main>
	);
};

export default PokemonGrid;
