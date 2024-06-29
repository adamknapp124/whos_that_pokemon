import React from 'react';

import styles from '../styles/PokemonGrid.module.css';
import { capitalize } from '@/app/utils/capitalize';

export default function StatsGraph({
	droppedPokemon1,
	droppedPokemon2,
	barLengths,
	stats1,
	stats2,
}) {
	return (
		<div>
			{droppedPokemon1 && (
				<div className={styles.comParent}>
					{Object.keys(barLengths).map((stat) => (
						<div className={styles.compareBox}>
							<div
								id={`${stat}-bar-1`}
								style={{ width: `${barLengths[stat].p1}%` }}
								className={styles.statBar1}>
								<span>{capitalize(stat)}</span>
								<span>{stats1[stat]}</span>
							</div>
							{droppedPokemon2 && (
								<div
									id={`${stat}-bar-2`}
									style={{ width: `${barLengths[stat].p2}%` }}
									className={styles.statBar2}>
									<span>{stats2[stat]}</span>
									<span>{capitalize(stat)}</span>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
