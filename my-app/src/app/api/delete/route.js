import connection from '../db';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function DELETE(req) {
	try {
		const { pokemon_id } = await req.json();

		const [rows] = await connection.execute(
			'DELETE FROM pokedex WHERE pokemon_id = ?',
			[pokemon_id]
		);

		revalidatePath('/');
		return NextResponse.json({ success: true, data: rows });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
