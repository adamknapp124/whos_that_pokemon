export async function getPoke() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
	if (response.ok) {
		const data = await response.json();
		const pokemonDetails = data.results.map((poke, index) => {
			const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				index + 1
			}.png`;
			return { url: imageURL, name: poke.name };
		});

		return pokemonDetails;
	}
}

export async function getPokeData(name) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
	if (response.ok) {
		const data = await response.json();
		return data;
	}
}

export async function getPokeLocation(id) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/4/`);
	if (response.ok) {
		const data = await response.json();
		return data;
	}
}

export async function getPokemonData() {
	console.log('starting function');
	const pokemon = await getPoke();
	const pokemonDetailsPromises = pokemon.map(async (poke) => {
		const pokemonDataPromise = getPokeData(poke.name);
		return {
			...poke,
			types: (await pokemonDataPromise).types.map((type) => type.type.name),
		};
	});
	const pokemonDetails = await Promise.all(pokemonDetailsPromises);
	console.log('function complete');
	return pokemonDetails;
}
