'use client';

import styles from '../styles/PokemonCard.module.css';
import { useRouter } from 'next/navigation';
import { capitalize } from '@/app/utils/capitalize';

export default function PokemonCard({ poke, isCaptured, type, handleOnDrag }) {
	const router = useRouter();

	return (
		<div
			id={`${poke.name}`}
			onClick={() => router.push(`/${poke.name}`)}
			className={isCaptured ? styles[type] : null}
			draggable='true'
			onDragStart={handleOnDrag}>
			<div className={styles.overlay}></div>
			<img src={poke.url} alt='pokemon' draggable='false' />
			<p>{capitalize(poke.name)}</p>
		</div>
	);
}
