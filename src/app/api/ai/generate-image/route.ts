import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, size, quality } = await req.json();
    
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: parseInt(size.split('x')[1]),
        width: parseInt(size.split('x')[0]),
        steps: quality === 'hd' ? 50 : 30,
        samples: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('이미지 생성에 실패했습니다.');
    }

    const data = await response.json();
    
    // Base64 이미지 데이터를 URL로 변환
    const imageUrl = `data:image/png;base64,${data.artifacts[0].base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('이미지 생성 오류:', error);
    return NextResponse.json(
      { error: '이미지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
