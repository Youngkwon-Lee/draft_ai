import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TEMPLATES = {
  knee: {
    title: "무릎 재활 루틴",
    description: "무릎 통증 완화와 근력 강화를 위한 재활 운동 루틴",
    prompt: "무릎 재활을 위한 운동 루틴을 생성해주세요. 슬개건염, 무릎 통증, 계단 오르내릴 때의 통증을 완화하고 근력을 강화하는 데 초점을 맞춰주세요."
  },
  shoulder: {
    title: "어깨 회전근개 루틴",
    description: "어깨 회전근개 근육 강화와 안정성 향상을 위한 운동 루틴",
    prompt: "어깨 회전근개 근육을 강화하고 안정성을 향상시키는 운동 루틴을 생성해주세요. 부상 예방과 재활에 초점을 맞춰주세요."
  },
  core: {
    title: "코어 안정성 루틴",
    description: "코어 근육 강화와 안정성 향상을 위한 운동 루틴",
    prompt: "코어 근육을 강화하고 안정성을 향상시키는 운동 루틴을 생성해주세요. 허리 통증 예방과 전신 안정성 향상에 초점을 맞춰주세요."
  },
  back: {
    title: "허리 안정성 루틴",
    description: "허리 통증 완화와 안정성 향상을 위한 운동 루틴",
    prompt: "허리 통증을 완화하고 안정성을 향상시키는 운동 루틴을 생성해주세요. 척추 건강과 자세 교정에 초점을 맞춰주세요."
  }
};

export async function POST(req: Request) {
  try {
    const { prompt, templateId } = await req.json();
    
    let finalPrompt = prompt;
    if (templateId && TEMPLATES[templateId as keyof typeof TEMPLATES]) {
      const template = TEMPLATES[templateId as keyof typeof TEMPLATES];
      finalPrompt = template.prompt;
    }

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `운동 루틴을 생성해주세요. 다음 형식으로 JSON 응답을 해주세요:
{
  "id": "고유ID",
  "title": "루틴 제목",
  "description": "루틴 설명",
  "exercises": [
    {
      "name": "운동 이름",
      "sets": "세트 수",
      "reps": "반복 횟수",
      "notes": "운동 시 주의사항"
    }
  ]
}

사용자의 요청: ${finalPrompt}`
        }
      ]
    });

    // Claude API 응답 처리 수정
    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    if (!content) {
      throw new Error('API 응답이 올바른 형식이 아닙니다.');
    }

    const routine = JSON.parse(content);

    // 템플릿을 사용한 경우, 템플릿의 제목과 설명을 적용
    if (templateId && TEMPLATES[templateId as keyof typeof TEMPLATES]) {
      const template = TEMPLATES[templateId as keyof typeof TEMPLATES];
      routine.title = template.title;
      routine.description = template.description;
    }

    return NextResponse.json({ routine });
  } catch (error) {
    console.error('루틴 생성 오류:', error);
    return NextResponse.json(
      { error: '루틴 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 