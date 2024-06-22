import connection from '../db';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req) {
	try {
		const { pokemon_id, name } = await req.json();
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
		const data = await response.json();
		const type = data.types[0].type.name;

		const [rows] = await connection.execute(
			'INSERT INTO pokedex (pokemon_id, name, type) VALUES (?, ?, ?)',
			[pokemon_id, name, type]
		);

		revalidatePath('/pokedex');
		return NextResponse.json({ success: true, data: rows });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
