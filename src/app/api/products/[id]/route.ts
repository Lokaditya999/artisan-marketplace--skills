import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products, artisans } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    const product = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        image: products.image,
        category: products.category,
        description: products.description,
        artisanId: products.artisanId,
        createdAt: products.createdAt,
        artisan: {
          id: artisans.id,
          name: artisans.name,
          bio: artisans.bio,
          story: artisans.story,
          profileImage: artisans.profileImage,
          specialization: artisans.specialization,
          location: artisans.location,
        },
      })
      .from(products)
      .leftJoin(artisans, eq(products.artisanId, artisans.id))
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
