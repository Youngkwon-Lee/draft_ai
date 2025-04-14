"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, FileText, Sparkles, Save } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "주제는 최소 2자 이상이어야 합니다.",
  }),
  keywords: z.string().optional(),
  type: z.enum(["blog", "social", "article"]),
  tone: z.enum(["professional", "casual", "friendly", "formal"]),
  length: z.enum(["short", "medium", "long"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function AIContentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const addPost = useAppStore((state) => state.addPost);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      keywords: "",
      type: "blog",
      tone: "professional",
      length: "medium",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setGeneratedContent("");

      // 키워드 배열로 변환
      const keywordsArray = values.keywords
        ? values.keywords.split(",").map((k) => k.trim())
        : [];

      // API 요청
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: values.topic,
          keywords: keywordsArray,
          type: values.type,
          tone: values.tone,
          length: values.length,
        }),
      });

      if (!response.ok) {
        throw new Error("콘텐츠 생성에 실패했습니다. 다시 시도해주세요.");
      }

      const data = await response.json();
      setGeneratedContent(data.content);

      toast({
        title: "콘텐츠 생성 완료",
        description: "AI가 콘텐츠를 성공적으로 생성했습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "콘텐츠 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const saveContent = () => {
    if (!generatedContent) return;

    // 제목 추출 - 첫 번째 # 으로 시작하는 라인을 제목으로 사용
    const titleMatch = generatedContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : "New Content";

    // 포스트 저장
    addPost({
      title,
      content: generatedContent,
      tags: form.getValues().keywords?.split(",").map(k => k.trim()) || [],
      published: false,
    });

    toast({
      title: "콘텐츠 저장 완료",
      description: "생성된 콘텐츠가 성공적으로 저장되었습니다.",
    });

    // 블로그 글 목록으로 이동 (필요시 주석 해제)
    // router.push("/posts");
  };

  const contentTypeOptions = [
    { value: "blog", label: "블로그 포스트" },
    { value: "social", label: "소셜 미디어 포스트" },
    { value: "article", label: "기사/아티클" },
  ];

  const toneOptions = [
    { value: "professional", label: "전문적" },
    { value: "casual", label: "일상적" },
    { value: "friendly", label: "친근한" },
    { value: "formal", label: "격식있는" },
  ];

  const lengthOptions = [
    { value: "short", label: "짧게 (300-500단어)" },
    { value: "medium", label: "중간 (600-900단어)" },
    { value: "long", label: "길게 (1000-1500단어)" },
  ];

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AI 콘텐츠 생성</h1>
        <p className="text-muted-foreground">
          원하는 주제와 스타일을 입력하면 AI가 자동으로 콘텐츠를 생성합니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-card border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              콘텐츠 생성 설정
            </CardTitle>
            <CardDescription>
              아래 정보를 입력하여 AI 콘텐츠 생성 설정을 구성하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>주제</FormLabel>
                      <FormControl>
                        <Input placeholder="콘텐츠 주제를 입력하세요" {...field} />
                      </FormControl>
                      <FormDescription>
                        생성할 콘텐츠의 주제나 제목을 입력하세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>키워드 (선택사항)</FormLabel>
                      <FormControl>
                        <Input placeholder="키워드1, 키워드2, 키워드3" {...field} />
                      </FormControl>
                      <FormDescription>
                        콘텐츠에 포함할 키워드를 쉼표로 구분하여 입력하세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>콘텐츠 유형</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="콘텐츠 유형을 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contentTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        생성할 콘텐츠의 유형을 선택하세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>톤</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="톤을 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {toneOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>길이</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="길이를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lengthOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                      콘텐츠 생성 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      콘텐츠 생성하기
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                생성된 콘텐츠
              </CardTitle>
              <CardDescription>
                AI가 생성한 콘텐츠가 여기에 표시됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-sm text-muted-foreground">
                    AI가 고품질 콘텐츠를 생성하고 있습니다...
                  </p>
                </div>
              ) : generatedContent ? (
                <div className="space-y-4">
                  <div className="bg-accent/10 rounded-md p-4 max-h-[500px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {generatedContent}
                    </pre>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={saveContent} className="bg-primary">
                      <Save className="mr-2 h-4 w-4" />
                      콘텐츠 저장하기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    AI 콘텐츠를 생성하려면 왼쪽의 양식을 작성하고 '콘텐츠 생성하기' 버튼을 클릭하세요.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
