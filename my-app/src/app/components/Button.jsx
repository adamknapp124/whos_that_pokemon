'use client';

import React from 'react';

export default function Button({ href, selectedPokemon, onClick }) {
	const handleClick = (event) => {
		if (onClick) {
			event.preventDefault();
			onClick(selectedPokemon);
		} else if (href) {
			window.location.href = href;
		}
	};

	return (
		<a href={href || '#'} onClick={handleClick}>
			{href ? 'Back' : 'Upload'}
		</a>
	);
}
