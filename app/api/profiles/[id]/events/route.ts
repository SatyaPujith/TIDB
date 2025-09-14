import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
import { Event, Provenance } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProvenance = searchParams.get('includeProvenance') === 'true';

    const events = await executeQuery<Event[]>(
      'SELECT * FROM events WHERE person_id = ? ORDER BY date ASC',
      [params.id]
    );

    // Parse JSON categories for each event
    const parsedEvents = events.map(event => ({
      ...event,
      categories: typeof event.categories === 'string' 
        ? JSON.parse(event.categories) 
        : event.categories || []
    }));

    if (includeProvenance) {
      // Fetch provenance data for each event
      const eventsWithProvenance = await Promise.all(
        parsedEvents.map(async (event) => {
          const provenance = await executeQuery<Provenance[]>(
            'SELECT * FROM provenance WHERE event_id = ?',
            [event.id]
          );
          return { ...event, provenance };
        })
      );

      return NextResponse.json({ events: eventsWithProvenance });
    }

    return NextResponse.json({ events: parsedEvents });
  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}