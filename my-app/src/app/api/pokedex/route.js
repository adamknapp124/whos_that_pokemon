import { NextResponse } from 'next/server';
import connection from '../db'; // Adjust the path based on your project structure

export async function GET() {
	try {
		const [rows] = await connection.execute('SELECT * FROM pokedex');
		return NextResponse.json(rows);
	} catch (error) {
		console.error('Error fetching Pokemon from database:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
