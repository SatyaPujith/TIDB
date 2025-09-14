import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
import { Profile, Event } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const profiles = await executeQuery<Profile[]>(
      'SELECT * FROM profiles WHERE id = ?',
      [params.id]
    );

    if (profiles.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const events = await executeQuery<Event[]>(
      'SELECT * FROM events WHERE person_id = ? ORDER BY date ASC',
      [params.id]
    );

    const parsedEvents = events.map((event) => ({
      ...event,
      categories: typeof event.categories === 'string' ? JSON.parse(event.categories) : event.categories || []
    }));

    return NextResponse.json({ profile: profiles[0], events: parsedEvents });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}