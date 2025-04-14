"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Image as ImageIcon, Sparkles, Download, Save } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "프롬프트는 최소 10자 이상이어야 합니다.",
  }),
  size: z.enum(["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"]),
  quality: z.enum(["standard", "hd"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function AIImagePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const addAIContent = useAppStore((state) => state.addAIContent);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      size: "1024x1024",
      quality: "standard",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setGeneratedImageUrl("");

      // API 요청
      const response = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("이미지 생성에 실패했습니다. 다시 시도해주세요.");
      }

      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl);

      toast({
        title: "이미지 생성 완료",
        description: "AI가 이미지를 성공적으로 생성했습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const saveImage = () => {
    if (!generatedImageUrl) return;

    // 저장
    addAIContent({
      prompt: form.getValues().prompt,
      content: "",
      image: generatedImageUrl,
    });

    toast({
      title: "이미지 저장 완료",
      description: "생성된 이미지가 성공적으로 저장되었습니다.",
    });
  };

  const downloadImage = () => {
    if (!generatedImageUrl) return;

    // 임시 앵커 요소 생성
    const link = document.createElement("a");
    link.href = generatedImageUrl;
    link.download = `ai-generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imageSizeOptions = [
    { value: "256x256", label: "256x256 (작음)" },
    { value: "512x512", label: "512x512 (중간)" },
    { value: "1024x1024", label: "1024x1024 (정사각형)" },
    { value: "1792x1024", label: "1792x1024 (와이드)" },
    { value: "1024x1792", label: "1024x1792 (세로)" },
  ];

  const imageQualityOptions = [
    { value: "standard", label: "표준" },
    { value: "hd", label: "고화질 (HD)" },
  ];

  const promptExamples = [
    { id: "1", text: "미래적인 스마트 시티의 공중 전망, 네온 불빛, 밤 하늘, 고층 건물" },
    { id: "2", text: "환경 보존을 상징하는 아름다운 컨셉 아트, 자연과 기술의 조화" },
    { id: "3", text: "고대 왕국의 마법사 탑, 판타지 스타일, 신비로운 빛, 상세한 건축물" },
    { id: "4", text: "봄날의 한옥마을 풍경, 벚꽃이 흩날리는 모습, 전통적인 한국 건축물" },
    { id: "5", text: "밤하늘의 우주 탐험가, 별이 빛나는 배경, 사이언스 픽션, 미래적인 우주복" },
  ];

  const aspectRatioDescription = {
    "256x256": "작은 크기 정사각형",
    "512x512": "중간 크기 정사각형",
    "1024x1024": "큰 크기 정사각형 (권장)",
    "1792x1024": "와이드 화면 (16:9 비율)",
    "1024x1792": "세로형 화면 (9:16 비율)",
  };

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AI 이미지 생성</h1>
        <p className="text-muted-foreground">
          원하는 이미지에 대한 설명(프롬프트)을 입력하면 AI가 자동으로 이미지를 생성합니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-card border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              이미지 생성 설정
            </CardTitle>
            <CardDescription>
              아래 정보를 입력하여 AI 이미지 생성 설정을 구성하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="form">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">이미지 생성</TabsTrigger>
                <TabsTrigger value="examples">프롬프트 예시</TabsTrigger>
              </TabsList>
              <TabsContent value="form" className="space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이미지 설명 (프롬프트)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="생성할 이미지를 자세히 설명해주세요..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            상세하게 묘사할수록 원하는 이미지에 가깝게 생성됩니다.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>크기</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="이미지 크기 선택" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {imageSizeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {aspectRatioDescription[field.value as keyof typeof aspectRatioDescription]}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="quality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>품질</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="이미지 품질 선택" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {imageQualityOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              고화질은 더 정교한 이미지를 생성하지만 시간이 더 걸립니다.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          이미지 생성 중...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          이미지 생성하기
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="examples">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    아래의 예시 프롬프트를 선택하여 이미지를 생성해보세요:
                  </p>
                  <div className="space-y-2">
                    {promptExamples.map((example) => (
                      <Card
                        key={example.id}
                        className="cursor-pointer hover:bg-accent/10 transition-colors"
                        onClick={() => form.setValue("prompt", example.text)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm">{example.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                생성된 이미지
              </CardTitle>
              <CardDescription>
                AI가 생성한 이미지가 여기에 표시됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-sm text-muted-foreground">
                    AI가 이미지를 생성하고 있습니다. 잠시만 기다려주세요...
                  </p>
                </div>
              ) : generatedImageUrl ? (
                <div className="space-y-4">
                  <div className="bg-accent/10 rounded-md p-2 flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-md">
                      <Image
                        src={generatedImageUrl}
                        alt="AI 생성 이미지"
                        width={512}
                        height={512}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={downloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                    <Button onClick={saveImage} className="bg-primary">
                      <Save className="mr-2 h-4 w-4" />
                      저장하기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    AI 이미지를 생성하려면 왼쪽의 양식을 작성하고 '이미지 생성하기' 버튼을 클릭하세요.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {generatedImageUrl && (
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="text-sm">사용된 프롬프트</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{form.getValues().prompt}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
