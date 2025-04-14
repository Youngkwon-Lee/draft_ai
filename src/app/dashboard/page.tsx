import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Image, Zap, Building2, Search } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">환영합니다, {session?.user?.name || '사용자'}</h1>
        <p className="text-muted-foreground">
          AI를 사용하여 블로그 및 소셜 미디어 콘텐츠를 빠르게 생성하세요.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/ai-content" className="w-full">
          <Card className="h-full hover:shadow-md transition-shadow border-border/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-primary" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  <Zap className="h-3 w-3" />
                </span>
              </div>
              <CardTitle className="mt-2">AI 콘텐츠 생성</CardTitle>
              <CardDescription>AI를 이용해 블로그와 소셜 미디어 콘텐츠를 자동으로 생성합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between">
                시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/ai-image" className="w-full">
          <Card className="h-full hover:shadow-md transition-shadow border-border/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Image className="h-5 w-5 text-accent" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                  <Zap className="h-3 w-3" />
                </span>
              </div>
              <CardTitle className="mt-2">AI 이미지 생성</CardTitle>
              <CardDescription>AI로 콘텐츠에 어울리는 이미지를 자동으로 생성합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between">
                시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/business" className="w-full">
          <Card className="h-full hover:shadow-md transition-shadow border-border/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-2">비즈니스 관리</CardTitle>
              <CardDescription>비즈니스 정보를 관리하고 콘텐츠 생성에 활용합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between">
                시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/60 md:col-span-2">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>최근에 생성한 AI 콘텐츠와 이미지를 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">아직 생성된 콘텐츠가 없습니다. AI 콘텐츠 생성을 시작해보세요.</p>
              <Link href="/ai-content">
                <Button variant="outline" className="mt-2">
                  AI 콘텐츠 생성하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>키워드 분석</CardTitle>
            <CardDescription>트렌드 키워드로 콘텐츠를 최적화하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">인기 키워드 분석으로 콘텐츠 효과를 높이세요.</p>
              <Link href="/keyword-analysis">
                <Button variant="outline" className="mt-2">
                  키워드 분석
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
