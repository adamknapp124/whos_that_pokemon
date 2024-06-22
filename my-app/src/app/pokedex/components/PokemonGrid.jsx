import PokemonCard from './PokemonCard';

const PokemonGrid = async ({ pokemon, captured }) => {
	const capturedPokemonNames = new Map(captured.map((mon) => [mon.name, mon.type]));
	return (
		<section>
			{pokemon.map((poke, index) => (
				<PokemonCard
					poke={poke}
					key={index}
					isCaptured={capturedPokemonNames.has(poke.name)}
					type={capturedPokemonNames.get(poke.name)}
				/>
			))}
		</section>
	);
};

export default PokemonGrid;
