import { NextResponse } from 'next/server';
import { db } from '@/db';
import { courses, artisans } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let allCourses;
    
    if (category && category !== 'all') {
      allCourses = await db
        .select({
          id: courses.id,
          title: courses.title,
          description: courses.description,
          category: courses.category,
          thumbnail: courses.thumbnail,
          price: courses.price,
          duration: courses.duration,
          level: courses.level,
          instructorId: courses.instructorId,
          createdAt: courses.createdAt,
          instructor: {
            id: artisans.id,
            name: artisans.name,
            profileImage: artisans.profileImage,
            specialization: artisans.specialization,
          },
        })
        .from(courses)
        .leftJoin(artisans, eq(courses.instructorId, artisans.id))
        .where(eq(courses.category, category));
    } else {
      allCourses = await db
        .select({
          id: courses.id,
          title: courses.title,
          description: courses.description,
          category: courses.category,
          thumbnail: courses.thumbnail,
          price: courses.price,
          duration: courses.duration,
          level: courses.level,
          instructorId: courses.instructorId,
          createdAt: courses.createdAt,
          instructor: {
            id: artisans.id,
            name: artisans.name,
            profileImage: artisans.profileImage,
            specialization: artisans.specialization,
          },
        })
        .from(courses)
        .leftJoin(artisans, eq(courses.instructorId, artisans.id));
    }

    return NextResponse.json(allCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
