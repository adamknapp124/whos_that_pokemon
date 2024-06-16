import styles from './pokegrid.module.css';
import PokemonCard from './PokemonCard';

const PokemonGrid = ({ pokemon }) => {
	return (
		<section className={styles.container}>
			<div className={styles.pokeGrid}>
				{pokemon.map((poke, index) => (
					<PokemonCard poke={poke} key={index} />
				))}
			</div>
		</section>
	);
};

export default PokemonGrid;
