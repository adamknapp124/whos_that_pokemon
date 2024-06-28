import React from 'react';
import styles from '../styles/dropbox.module.css';
import ComparedImage from '@/app/components/ComparedImage';

const DropBox = ({ pokeName, handleDrop, handleDragOver, droppedPokemon }) => {
	const officialArtwork =
		droppedPokemon?.sprites.other['official-artwork'].front_default;
	const hp = droppedPokemon?.stats[0].base_stat;

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
						<div>{hp}</div>
					</>
				) : (
					<div>Drop a pokemon here to view stats</div>
				)}
			</div>
		</>
	);
};

export default DropBox;
