import { toast } from "@/hooks/use-toast";

const API_URL = process.env.NEXT_PUBLIC_STABLE_DIFFUSION_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_STABLE_DIFFUSION_API_KEY;

interface ImageGenerationParams {
  prompt: string;
  style: string;
  num_images: number;
}

export async function generateExerciseIllustrations({
  prompt,
  style,
  num_images = 4,
}: ImageGenerationParams): Promise<string[]> {
  if (!API_URL || !API_KEY) {
    throw new Error("API 설정이 올바르지 않습니다. 환경 변수를 확인해주세요.");
  }

  try {
    // 스타일에 따른 프롬프트 보강
    const enhancedPrompt = enhancePrompt(prompt, style);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: enhancedPrompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: num_images,
        steps: 30,
        style_preset: style === "realistic" ? "photographic" : 
                     style === "cartoon" ? "comic-book" : 
                     "line-art",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "이미지 생성에 실패했습니다.");
    }

    const data = await response.json();
    return data.artifacts.map((artifact: any) => `data:image/png;base64,${artifact.base64}`);
  } catch (error) {
    console.error("이미지 생성 중 오류 발생:", error);
    throw error;
  }
}

function enhancePrompt(prompt: string, style: string): string {
  const stylePrompts = {
    realistic: "highly detailed, photorealistic, professional photography, 8k, ultra detailed, exercise pose, fitness, workout, clear background",
    cartoon: "cartoon style, vibrant colors, clean lines, digital art, illustration, exercise pose, fitness, workout, clear background",
    line: "line art, minimalistic, black and white, clean lines, technical drawing, exercise pose, fitness, workout, clear background",
  };

  return `${prompt}, ${stylePrompts[style as keyof typeof stylePrompts]}`;
} 