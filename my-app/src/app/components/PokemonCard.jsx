'use client';

import { useRouter } from 'next/navigation';
import { capitalize } from '../utils/capitalize';

export default function PokemonCard({ poke }) {
	const router = useRouter();

	return (
		<button onClick={() => router.push(`/pokemon/${poke.name}`)}>
			<img src={poke.url} alt='pokemon' />
			<p>{capitalize(poke.name)}</p>
		</button>
	);
}
