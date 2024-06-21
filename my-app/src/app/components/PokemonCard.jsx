'use client';

import styles from './styles/PokemonCard.module.css';
import { useRouter } from 'next/navigation';
import { capitalize } from '../utils/capitalize';

export default function PokemonCard({ poke, isCaptured }) {
	const type = poke.types[0];
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/${poke.name}`)}
			className={isCaptured ? styles[type] : null} // Fixed className syntax
		>
			<img src={poke.url} alt='pokemon' />
			<p>{capitalize(poke.name)}</p>
		</button>
	);
}
