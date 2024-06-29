'use client';

import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { getPokeData } from '@/app/api/Pokemons/route';

import styles from '../styles/PokemonGrid.module.css';
import DropBox from './DropBox';

const PokemonGrid = ({ pokemon, captured, onDropPokemon }) => {
	const [droppedPokeName1, setDroppedPokeName1] = useState('');
	const [droppedPokeName2, setDroppedPokeName2] = useState('');
	const [droppedPokemon1, setDroppedPokemon1] = useState(null);
	const [droppedPokemon2, setDroppedPokemon2] = useState(null);
	const [stats1, setStats1] = useState({
		hp: 0,
		attack: 0,
		defense: 0,
		specialAttack: 0,
		specialDefense: 0,
		speed: 0,
	});
	const [stats2, setStats2] = useState({
		hp: 0,
		attack: 0,
		defense: 0,
		specialAttack: 0,
		specialDefense: 0,
		speed: 0,
	});
	const [barLengths, setBarLengths] = useState({
		hp: { p1: 0, p2: 0 },
		attack: { p1: 0, p2: 0 },
		defense: { p1: 0, p2: 0 },
		specialAttack: { p1: 0, p2: 0 },
		specialDefense: { p1: 0, p2: 0 },
		speed: { p1: 0, p2: 0 },
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
			<div>
				{Object.keys(barLengths).map((stat) => (
					<div className={styles.compareBox} key={stat}>
						<div
							id={`${stat}-bar-1`}
							style={{ width: `${barLengths[stat].p1}%` }}
							className={styles.statBar1}>
							{stats1[stat]}
						</div>
						<div
							id={`${stat}-bar-2`}
							style={{ width: `${barLengths[stat].p2}%` }}
							className={styles.statBar2}>
							{stats2[stat]}
						</div>
					</div>
				))}
			</div>
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
		</main>
	);
};

export default PokemonGrid;
