import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const personalInfo = await prisma.personalInfo.findFirst();
    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return NextResponse.json({ error: 'Failed to fetch personal info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const personalInfo = await prisma.personalInfo.upsert({
      where: { id: 1 }, // Assuming we always have one record
      update: data,
      create: { ...data, id: 1 }
    });

    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error('Error updating personal info:', error);
    return NextResponse.json({ error: 'Failed to update personal info' }, { status: 500 });
  }
} 