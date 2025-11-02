import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, totalPrice, totalQuantity, shippingInfo } = body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items must be a non-empty array', code: 'INVALID_ITEMS' },
        { status: 400 }
      );
    }

    // Validate totalPrice
    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      return NextResponse.json(
        { error: 'Total price must be a positive number', code: 'INVALID_TOTAL_PRICE' },
        { status: 400 }
      );
    }

    // Validate totalQuantity
    if (typeof totalQuantity !== 'number' || totalQuantity <= 0) {
      return NextResponse.json(
        { error: 'Total quantity must be a positive number', code: 'INVALID_TOTAL_QUANTITY' },
        { status: 400 }
      );
    }

    // Validate shippingInfo
    if (!shippingInfo || typeof shippingInfo !== 'object') {
      return NextResponse.json(
        { error: 'Shipping info is required', code: 'MISSING_SHIPPING_INFO' },
        { status: 400 }
      );
    }

    const { fullName, phone, address, country, city } = shippingInfo;

    // Validate required shipping info fields
    if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
      return NextResponse.json(
        { error: 'Shipping info must include fullName', code: 'MISSING_FULL_NAME' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json(
        { error: 'Shipping info must include phone', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }

    if (!address || typeof address !== 'string' || address.trim() === '') {
      return NextResponse.json(
        { error: 'Shipping info must include address', code: 'MISSING_ADDRESS' },
        { status: 400 }
      );
    }

    if (!country || typeof country !== 'string' || country.trim() === '') {
      return NextResponse.json(
        { error: 'Shipping info must include country', code: 'MISSING_COUNTRY' },
        { status: 400 }
      );
    }

    if (!city || typeof city !== 'string' || city.trim() === '') {
      return NextResponse.json(
        { error: 'Shipping info must include city', code: 'MISSING_CITY' },
        { status: 400 }
      );
    }

    // Sanitize shipping info strings
    const sanitizedShippingInfo = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      country: country.trim(),
      city: city.trim(),
    };

    // Create order
    const newOrder = await db.insert(orders).values({
      userId: session.user.id,
      items: items,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
      shippingInfo: sanitizedShippingInfo,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).returning();

    return NextResponse.json(newOrder[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Get all orders for the authenticated user
    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, session.user.id))
      .orderBy(desc(orders.createdAt));

    return NextResponse.json(userOrders, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}