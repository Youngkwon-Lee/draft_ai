import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Draft AI - 자동 콘텐츠 생성 플랫폼
        </h1>
        <p className="text-xl mb-8 text-center">
          AI를 활용한 블로그 및 소셜 미디어 콘텐츠 자동 생성 플랫폼입니다.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">로그인하기</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
