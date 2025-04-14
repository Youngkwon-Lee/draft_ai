import OpenAI from 'openai';

// Initialize OpenAI client - in a real app, use environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key', // Replace with your API key in production
  dangerouslyAllowBrowser: true, // Only for demo purposes
});

export interface ContentGenerationParams {
  topic: string;
  keywords?: string[];
  type: 'blog' | 'social' | 'article';
  tone?: 'professional' | 'casual' | 'friendly' | 'formal';
  length?: 'short' | 'medium' | 'long';
}

export interface ImageGenerationParams {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  n?: number;
}

// Generate content using OpenAI
export async function generateContent(params: ContentGenerationParams): Promise<string> {
  try {
    const { topic, keywords = [], type, tone = 'professional', length = 'medium' } = params;

    const keywordsString = keywords.length > 0 ? `Include these keywords naturally: ${keywords.join(', ')}. ` : '';

    let contentLength = '';
    if (length === 'short') contentLength = '300-500 words';
    else if (length === 'medium') contentLength = '600-900 words';
    else contentLength = '1000-1500 words';

    const prompt = `
      Write a ${length} ${type} about "${topic}".
      ${keywordsString}
      Use a ${tone} tone.
      The content should be around ${contentLength}.
      Include an engaging title.
      Format it with Markdown, including proper headings and sections.
    `;

    // In demo mode, simulate response for development
    if (openai.apiKey === 'demo-key') {
      console.log('Using demo mode for content generation');
      return generateDemoContent(params);
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content writer specialized in creating high-quality, engaging content.',
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message.content || 'Failed to generate content.';
  } catch (error) {
    console.error('Error generating content:', error);
    return 'Failed to generate content. Please try again.';
  }
}

// Generate image using OpenAI
export async function generateImage(params: ImageGenerationParams): Promise<string | null> {
  try {
    const { prompt, size = '1024x1024', quality = 'standard', n = 1 } = params;

    // In demo mode, simulate response for development
    if (openai.apiKey === 'demo-key') {
      console.log('Using demo mode for image generation');
      return 'https://placehold.co/1024x1024/5E17EB/FFFFFF/png?text=AI+Generated+Image';
    }

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n,
      size,
      quality,
    });

    return response.data[0]?.url || null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

// Demo content function for development
function generateDemoContent(params: ContentGenerationParams): string {
  const { topic, type } = params;

  return `# The Ultimate Guide to ${topic}

## Introduction

In today's fast-paced world, understanding ${topic} has become more important than ever. This ${type} will explore the key aspects of ${topic} and provide actionable insights that you can apply immediately.

## Why ${topic} Matters

${topic} is not just a trending topic, but a fundamental shift in how we approach problems. By embracing the principles of ${topic}, organizations and individuals can unlock new opportunities and overcome challenges more effectively.

## Key Strategies for Success

1. **Research and Understand**: Before diving into ${topic}, take the time to understand its core principles.
2. **Develop a Plan**: Create a strategic approach that aligns with your specific goals.
3. **Implement Gradually**: Start with small changes and build momentum over time.
4. **Measure Results**: Track your progress and adjust your approach as needed.

## Conclusion

${topic} represents a significant opportunity for those willing to invest the time and effort to master it. By following the strategies outlined in this ${type}, you'll be well-positioned to leverage its benefits and stay ahead of the curve.
`;
}
