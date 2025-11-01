import { NextResponse } from 'next/server';
import { db } from '@/db';
import { videos, artisans } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    let query = db
      .select({
        id: videos.id,
        title: videos.title,
        description: videos.description,
        videoUrl: videos.videoUrl,
        thumbnail: videos.thumbnail,
        category: videos.category,
        type: videos.type,
        views: videos.views,
        artisanId: videos.artisanId,
        createdAt: videos.createdAt,
        artisan: {
          id: artisans.id,
          name: artisans.name,
          profileImage: artisans.profileImage,
        },
      })
      .from(videos)
      .leftJoin(artisans, eq(videos.artisanId, artisans.id));

    let allVideos = await query;

    // Filter by category and type if provided
    if (category && category !== 'all') {
      allVideos = allVideos.filter((v) => v.category === category);
    }
    if (type) {
      allVideos = allVideos.filter((v) => v.type === type);
    }

    return NextResponse.json(allVideos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
