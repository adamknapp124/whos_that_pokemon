// src/app/api/updateDropped/route.js
import { NextResponse } from 'next/server';

export async function POST(req, res) {
	if (req.method === 'POST') {
		const { droppedPokeName } = await req.json(); // Ensure you await req.json() to parse the request body
		console.log(`Dropped ${droppedPokeName}`);
		return NextResponse.json({ droppedPokeName });
	} else {
		return NextResponse.json({ message: 'Method Not Allowed' });
	}
}
