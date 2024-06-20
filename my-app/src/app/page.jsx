import PokemonGrid from './components/PokemonGrid';
import { getPoke } from './api/Pokemons/route';

export default async function Home() {
	const pokemon = await getPoke();

	return (
		<main className='main'>
			<PokemonGrid pokemon={pokemon} />
		</main>
	);
}
