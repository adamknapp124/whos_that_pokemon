'use client';

import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '../utils/capitalize';

export default function PokemonCard({ poke }) {
	const router = useRouter();

	return (
		<button onClick={() => router.push(`/pokemon/${poke.name}`)}>
			<img src={poke.url} alt='pokemon' />
			<p>{capitalizeFirstLetter(poke.name)}</p>
		</button>
	);
}
