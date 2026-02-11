import { NextResponse } from 'next/server';
import { getAllSites, createSite } from '@/lib/db';

export async function GET() {
  try {
    const sites = await getAllSites();
    return NextResponse.json(sites);
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, token } = body;

    if (!name || !url || !token) {
      return NextResponse.json(
        { error: 'Name, URL, and token are required' },
        { status: 400 }
      );
    }

    const site = await createSite({ name, url, token });
    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 });
  }
}
