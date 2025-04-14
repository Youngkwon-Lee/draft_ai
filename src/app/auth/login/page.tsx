"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(6, {
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "로그인 실패",
          description: "이메일 또는 비밀번호가 올바르지 않습니다.",
          variant: "destructive",
        });
        return;
      }

      router.replace("/dashboard");
      router.refresh();

    } catch (error) {
      toast({
        title: "오류",
        description: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // 테스트 계정으로 로그인하는 기능
  const loginAsDemo = async () => {
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email: "admin@example.com",
        password: "password123",
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "로그인 실패",
          description: "데모 계정 로그인 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        return;
      }

      router.replace("/dashboard");
      router.refresh();

    } catch (error) {
      toast({
        title: "오류",
        description: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary">
          <span className="text-2xl font-bold text-white">D</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold">Draft AI에 로그인</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI를 활용한 블로그와 소셜 미디어 콘텐츠 자동 생성 플랫폼
        </p>
      </div>

      <Card className="border-border/40 bg-glass">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            계정에 로그인하여 AI 콘텐츠 생성을 시작하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        type="email"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="6자 이상 입력해주세요"
                        type="password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-gradient-primary" type="submit" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </Form>

          <div className="mt-4">
            <Button variant="outline" className="w-full" disabled={loading} onClick={loginAsDemo}>
              데모 계정으로 로그인
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/40 pt-4">
          <div className="text-center text-sm text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              가입하기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
