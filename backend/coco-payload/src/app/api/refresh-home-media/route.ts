// Example using the App Router: app/api/refresh-home-media/route.ts
import { NextResponse } from 'next/server';
import { refreshHomeMediaJSON } from '../../../refresh-json';

export async function GET() {
  try {
    await refreshHomeMediaJSON();
    return NextResponse.json({ message: 'JSON refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing JSON:', error);
    return NextResponse.json({ error: 'Failed to refresh JSON' }, { status: 500 });
  }
}
