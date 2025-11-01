import { NextResponse } from 'next/server';
import { db } from '@/db';
import { artisans } from '@/db/schema';

export async function GET() {
  try {
    const allArtisans = await db.select().from(artisans);
    return NextResponse.json(allArtisans);
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return NextResponse.json({ error: 'Failed to fetch artisans' }, { status: 500 });
  }
}
