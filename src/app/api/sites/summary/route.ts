import { NextResponse } from 'next/server';
import { getAllSites } from '@/lib/db';
import { getSiteSummary } from '@/lib/wp-client';
import type { SiteSummary } from '@/lib/types';

export async function GET() {
  try {
    const sites = getAllSites();

    const summaryPromises = sites.map(async (site): Promise<SiteSummary> => {
      const summary = await getSiteSummary(site);
      return {
        id: site.id,
        name: site.name,
        url: site.url,
        ...summary,
      };
    });

    const summaries = await Promise.all(summaryPromises);
    return NextResponse.json(summaries);
  } catch (error) {
    console.error('Error fetching summaries:', error);
    return NextResponse.json({ error: 'Failed to fetch summaries' }, { status: 500 });
  }
}
