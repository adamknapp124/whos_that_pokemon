import React from 'react';
import styles from '../styles/dropbox.module.css';
import ComparedImage from '@/app/components/ComparedImage';
import { capitalize } from '@/app/utils/capitalize';

const DropBox = ({ pokeName, handleDrop, handleDragOver, droppedPokemon }) => {
	const officialArtwork =
		droppedPokemon?.sprites.other['official-artwork'].front_default;
	const hp = droppedPokemon?.stats[0].base_stat;
	const attack = droppedPokemon?.stats[1].base_stat;
	const defense = droppedPokemon?.stats[2].base_stat;
	const specialAttack = droppedPokemon?.stats[3].base_stat;
	const specialDefense = droppedPokemon?.stats[4].base_stat;
	const speed = droppedPokemon?.stats[5].base_stat;
	// hp, attack, defense, special-attack, special-defense, speed

	return (
		<>
			<div
				id='dropbox'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className={styles.dropCard}>
				{droppedPokemon ? (
					<>
						<ComparedImage artwork={officialArtwork} />
						<div>{capitalize(pokeName)}</div>
						<div>HP: {hp}</div>
						<div>ATTACK: {attack}</div>
						<div>DEFENSE: {defense}</div>
						<div>SPECIAL ATTACK: {specialAttack}</div>
						<div>SPECIAL DEFENSE: {specialDefense}</div>
						<div>SPEED: {speed}</div>
					</>
				) : (
					<div>Drop a pokemon here to view stats</div>
				)}
			</div>
		</>
	);
};

export default DropBox;
