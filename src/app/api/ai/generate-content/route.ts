import { NextResponse } from 'next/server';
import { generateContent, type ContentGenerationParams } from '@/lib/openai';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse params from request
    const params = await request.json() as ContentGenerationParams;

    if (!params.topic || !params.type) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Generate content
    const content = await generateContent(params);

    // Return the generated content
    return NextResponse.json({ content });
  } catch (error) {
    console.error('[AI Content Generation Error]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
