import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Get session from better-auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check if session exists and has valid user
    if (!session?.user?.id) {
      return NextResponse.json(
        { 
          error: 'Unauthorized - no valid session',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Parse request body
    const body = await request.json();
    const { userType } = body;

    // Validate userType is provided
    if (!userType) {
      return NextResponse.json(
        {
          error: 'userType is required',
          code: 'MISSING_USER_TYPE'
        },
        { status: 400 }
      );
    }

    // Validate userType is either "artisan" or "buyer"
    if (userType !== 'artisan' && userType !== 'buyer') {
      return NextResponse.json(
        {
          error: 'userType must be either "artisan" or "buyer"',
          code: 'INVALID_USER_TYPE'
        },
        { status: 400 }
      );
    }

    // Update user_type in database
    const updatedUser = await db
      .update(user)
      .set({ 
        userType: userType,
        updatedAt: new Date()
      })
      .where(eq(user.id, userId))
      .returning();

    // Check if user was found and updated
    if (updatedUser.length === 0) {
      return NextResponse.json(
        {
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return updated user data
    return NextResponse.json(updatedUser[0], { status: 200 });

  } catch (error) {
    console.error('POST /api/auth/update-user-type error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}