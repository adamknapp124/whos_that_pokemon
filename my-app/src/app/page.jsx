import PokemonGrid from './components/PokemonGrid';
import { getPokemonData } from './api/Pokemons/route';
import { getCapturedPokemon } from './api/actions/getCapturedPokemon';

export default async function Home() {
	const pokemonData = await getPokemonData();
	const capturedMons = await getCapturedPokemon();

	return (
		<main className='main'>
			<PokemonGrid pokemon={pokemonData} captured={capturedMons} />
		</main>
	);
}
