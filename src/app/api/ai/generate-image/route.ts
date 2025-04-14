import { NextResponse } from 'next/server';
import { generateImage, type ImageGenerationParams } from '@/lib/openai';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse params from request
    const params = await request.json() as ImageGenerationParams;

    if (!params.prompt) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Generate image
    const imageUrl = await generateImage(params);

    if (!imageUrl) {
      return new NextResponse('Failed to generate image', { status: 500 });
    }

    // Return the generated image URL
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('[AI Image Generation Error]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
