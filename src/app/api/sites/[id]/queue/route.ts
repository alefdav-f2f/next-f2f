import { NextResponse } from 'next/server';
import { getSiteById } from '@/lib/db';
import { getQueueStatus } from '@/lib/wp-client';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const site = getSiteById(Number(id));
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const queue = await getQueueStatus(site);
    return NextResponse.json(queue);
  } catch (error) {
    console.error('Error fetching queue:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch queue status';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
