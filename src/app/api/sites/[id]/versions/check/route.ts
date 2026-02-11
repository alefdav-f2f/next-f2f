import { NextResponse } from 'next/server';
import { getSiteById } from '@/lib/db';
import { checkVersions } from '@/lib/wp-client';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const site = await getSiteById(Number(id));
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const result = await checkVersions(site);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error triggering version check:', error);
    const message = error instanceof Error ? error.message : 'Failed to trigger version check';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
