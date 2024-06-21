import PokemonCard from './PokemonCard';

const PokemonGrid = async ({ pokemon, captured }) => {
	const capturedPokemonNames = new Set(captured.map((mon) => mon.name));
	const capturedNames = [...capturedPokemonNames];
	return (
		<section>
			{pokemon.map((poke, index) => (
				<PokemonCard
					poke={poke}
					key={index}
					isCaptured={capturedPokemonNames.has(poke.name)}
					captured={capturedNames}
				/>
			))}
		</section>
	);
};

export default PokemonGrid;
