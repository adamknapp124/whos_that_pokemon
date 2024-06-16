'use server';

async function getPokeData(name) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
	if (response.ok) {
		const data = await response.json();
		return data;
	}
}
