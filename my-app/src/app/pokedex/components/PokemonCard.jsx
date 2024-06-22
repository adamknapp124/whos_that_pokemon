'use client';

import styles from '../styles/PokemonCard.module.css';
import { useRouter } from 'next/navigation';
import { capitalize } from '@/app/utils/capitalize';

export default function PokemonCard({ poke, isCaptured, type }) {
	const router = useRouter();

	return (
		<div
			id='card'
			onClick={() => router.push(`/${poke.name}`)}
			className={isCaptured ? styles[type] : null} // Fixed className syntax
		>
			<div className={styles.overlay}></div>
			<img src={poke.url} alt='pokemon' />
			<p>{capitalize(poke.name)}</p>
		</div>
	);
}
