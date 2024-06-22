import { getPokeData, getPokeLocation } from '@/app/api/Pokemons/route';

import PokemonInfo from '../pokedex/components/PokemonInfo';

export default async function page({ params: { selectedPokemon } }) {
	const data = await getPokeData(selectedPokemon);
	const location = await getPokeLocation(data.id);

	return (
		<PokemonInfo location={location} data={data} selectedPokemon={selectedPokemon} />
	);
}
