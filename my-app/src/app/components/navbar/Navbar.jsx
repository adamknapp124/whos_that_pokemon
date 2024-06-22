import React from 'react';

import styles from './styles/navbar.module.css';

export default function Navbar() {
	return (
		<nav className={styles.nav}>
			<ul className={styles.container}>
				<li>
					<a className={styles.link} href='/'>
						Home
					</a>
				</li>
				<li>
					<a className={styles.link} href='/pokedex'>
						Pokedex
					</a>
				</li>
				<li>
					<a className={styles.link} href='#'>
						Home
					</a>
				</li>
			</ul>
		</nav>
	);
}
