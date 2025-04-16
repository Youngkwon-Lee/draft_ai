"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Image,
  Download,
  Trash2,
  Loader2
} from "lucide-react";

interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

// TODO: 실제 API 호출로 대체
const mockImages: GeneratedImage[] = [
  {
    id: "1",
    prompt: "30대 남성이 체육관에서 스쿼트를 하는 모습, 현실적인 스타일",
    imageUrl: "https://example.com/image1.jpg",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    prompt: "20대 여성이 요가 매트에서 플랭크 자세를 취하는 모습, 부드러운 조명",
    imageUrl: "https://example.com/image2.jpg",
    createdAt: "2024-03-14",
  },
];

export default function AIImagePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>(mockImages);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // TODO: API 호출 구현
    setTimeout(() => {
      setImages([
        {
          id: (images.length + 1).toString(),
          prompt,
          imageUrl: "https://example.com/new-image.jpg",
          createdAt: new Date().toISOString().split("T")[0],
        },
        ...images,
      ]);
      setPrompt("");
      setIsGenerating(false);
    }, 2000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 이미지를 삭제하시겠습니까?")) {
      // TODO: API 호출 구현
      setImages(images.filter((image) => image.id !== id));
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">AI 운동 일러스트레이션</h1>
          <p className="text-muted-foreground mt-2">
            AI를 활용하여 운동 일러스트레이션을 생성하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>이미지 생성</CardTitle>
            <CardDescription>
              원하는 운동 일러스트레이션을 생성하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">프롬프트</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="예: 30대 남성이 체육관에서 스쿼트를 하는 모습, 현실적인 스타일"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>스타일</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={style === "realistic" ? "default" : "outline"}
                    onClick={() => setStyle("realistic")}
                  >
                    현실적
                  </Button>
                  <Button
                    type="button"
                    variant={style === "cartoon" ? "default" : "outline"}
                    onClick={() => setStyle("cartoon")}
                  >
                    만화
                  </Button>
                  <Button
                    type="button"
                    variant={style === "minimal" ? "default" : "outline"}
                    onClick={() => setStyle("minimal")}
                  >
                    미니멀
                  </Button>
                </div>
              </div>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Image className="mr-2 h-4 w-4" />
                    이미지 생성
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>생성된 이미지</CardTitle>
            <CardDescription>
              이전에 생성된 이미지들을 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border"
                >
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-full flex-col justify-between p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-white">{image.prompt}</p>
                        <p className="text-xs text-gray-300">
                          생성일: {image.createdAt}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/10 hover:bg-white/20"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/10 hover:bg-white/20"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 