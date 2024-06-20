// import styles from './pokegrid.module.css';
import PokemonCard from './PokemonCard';

const PokemonGrid = ({ pokemon }) => {
	return (
		<section>
			{pokemon.map((poke, index) => (
				<PokemonCard poke={poke} key={index} />
			))}
		</section>
	);
};

export default PokemonGrid;
