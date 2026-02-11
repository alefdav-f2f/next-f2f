import { NextResponse } from 'next/server';
import { getSiteById } from '@/lib/db';
import { getVersions } from '@/lib/wp-client';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const site = await getSiteById(Number(id));
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const versions = await getVersions(site);
    return NextResponse.json(versions);
  } catch (error) {
    console.error('Error fetching versions:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch versions';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
