export async function getCapturedPokemon() {
	try {
		const response = await fetch('http://localhost:3000/api/pokedex'); // Adjust this path if necessary
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error('Failed to fetch captured Pokemon');
		}
	} catch (error) {
		console.error('Error fetching captured Pokemon:', error);
		return [];
	}
}
