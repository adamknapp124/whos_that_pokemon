import PokemonGrid from './components/PokemonGrid';
import { getCapturedPokemon } from '../api/actions/getCapturedPokemon';
import { getPoke } from '../api/Pokemons/route';

export default async function Pokedex() {
	const pokemon = await getPoke();
	const capturedMons = await getCapturedPokemon();

	return (
		<main className='main'>
			<PokemonGrid pokemon={pokemon} captured={capturedMons} />
		</main>
	);
}
