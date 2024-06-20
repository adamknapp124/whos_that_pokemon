import connection from '../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const { pokemon_id, name } = await req.json();

		const [rows] = await connection.execute(
			'INSERT INTO pokedex (pokemon_id, name) VALUES (?, ?)',
			[pokemon_id, name]
		);

		return NextResponse.json({ success: true, data: rows });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
