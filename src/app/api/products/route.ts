import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products, artisans } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let allProducts;
    
    if (category && category !== 'all') {
      allProducts = await db
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
            profileImage: artisans.profileImage,
            specialization: artisans.specialization,
          },
        })
        .from(products)
        .leftJoin(artisans, eq(products.artisanId, artisans.id))
        .where(eq(products.category, category));
    } else {
      allProducts = await db
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
            profileImage: artisans.profileImage,
            specialization: artisans.specialization,
          },
        })
        .from(products)
        .leftJoin(artisans, eq(products.artisanId, artisans.id));
    }

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
