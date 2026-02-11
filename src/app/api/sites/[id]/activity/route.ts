import { NextResponse } from 'next/server';
import { getSiteById } from '@/lib/db';
import { getActivity } from '@/lib/wp-client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const site = getSiteById(Number(id));
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('per_page') || '20', 10);

    const result = await getActivity(site, page, perPage);

    return NextResponse.json(result.data, {
      headers: {
        'X-WP-Total': String(result.total),
        'X-WP-TotalPages': String(result.totalPages),
      },
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch activity';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
