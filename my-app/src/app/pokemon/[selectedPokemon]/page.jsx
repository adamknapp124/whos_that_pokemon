import { getPokeData, getPokeLocation } from '@/app/api/Pokemons/route';

import styles from './page.module.css';
import BackButton from '@/app/components/BackButton';

export default async function page({ params: { selectedPokemon } }) {
	const data = await getPokeData(selectedPokemon);
	const location = await getPokeLocation(data.id);

	const region = location.pokedex_numbers[1].pokedex.name;

	console.log(location);
	const types = data.types.map((type) => type.type.name);
	const statsArray = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}

	const bannerClass = styles[types[0]];

	return (
		<main className={styles.main}>
			<div className={bannerClass}>
				<img
					src={data.sprites.other['official-artwork'].front_default}
					alt={data.name}
					className={styles.image}
				/>
				<h1 className={styles.name}>{capitalizeFirstLetter(data.name)}</h1>
			</div>
			<BackButton />
			<div className={styles.entry}>Pokedex entry: {data.id}</div>
			<div className={styles.typesSection}>
				<div className={styles.typesHeader}>Types:</div>
				{types.map((type) => (
					<div key={type} className={styles.type} id='type'>
						{capitalizeFirstLetter(type)}
					</div>
				))}
			</div>
			<div className={styles.statsSection}>
				{statsArray.map((stat, index) => (
					<div key={index} className={styles.stat}>
						{capitalizeFirstLetter(stat)}
					</div>
				))}
			</div>
			<div className={styles.region}>Region: {capitalizeFirstLetter(region)}</div>
		</main>
	);
}
