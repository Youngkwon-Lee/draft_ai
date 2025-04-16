"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity,
  Calendar,
  BookOpen,
  BarChart2,
  Image
} from "lucide-react";

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">내 대시보드</h1>
          <p className="text-muted-foreground mt-2">
            나의 운동 루틴과 진행 상황을 확인하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                오늘의 운동
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3개</div>
              <p className="text-xs text-muted-foreground">
                오늘 완료해야 할 운동 루틴
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                이번 주 운동
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12회</div>
              <p className="text-xs text-muted-foreground">
                이번 주 완료한 운동 횟수
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                학습 자료
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5개</div>
              <p className="text-xs text-muted-foreground">
                확인 가능한 교육 자료
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                진행률
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                이번 달 목표 달성률
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
              개요
            </TabsTrigger>
            <TabsTrigger value="routines" onClick={() => setActiveTab("routines")}>
              운동 루틴
            </TabsTrigger>
            <TabsTrigger value="illustrations" onClick={() => setActiveTab("illustrations")}>
              운동 일러스트
            </TabsTrigger>
            <TabsTrigger value="education" onClick={() => setActiveTab("education")}>
              교육 자료
            </TabsTrigger>
            <TabsTrigger value="analysis" onClick={() => setActiveTab("analysis")}>
              분석
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>오늘의 운동 루틴</CardTitle>
                <CardDescription>
                  오늘 완료해야 할 운동 루틴입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">슬개건염 재활 루틴</h3>
                      <p className="text-sm text-muted-foreground">
                        스쿼트 3세트 × 10회, 레그 익스텐션 3세트 × 12회
                      </p>
                    </div>
                    <Button>시작하기</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">코어 안정성 루틴</h3>
                      <p className="text-sm text-muted-foreground">
                        플랭크 3세트 × 30초, 사이드 플랭크 3세트 × 20초
                      </p>
                    </div>
                    <Button>시작하기</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>최근 학습 자료</CardTitle>
                <CardDescription>
                  최근에 확인한 교육 자료입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">슬개건염 재활 가이드</h3>
                      <p className="text-sm text-muted-foreground">
                        슬개건염 재활을 위한 운동과 주의사항에 대한 가이드
                      </p>
                    </div>
                    <Button variant="outline">다시 보기</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="routines">
            <Card>
              <CardHeader>
                <CardTitle>운동 루틴</CardTitle>
                <CardDescription>
                  나의 운동 루틴을 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  운동 루틴 페이지로 이동합니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="illustrations">
            <Card>
              <CardHeader>
                <CardTitle>운동 일러스트</CardTitle>
                <CardDescription>
                  운동 일러스트레이션을 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  운동 일러스트레이션 페이지로 이동합니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>교육 자료</CardTitle>
                <CardDescription>
                  교육 자료를 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  교육 자료 페이지로 이동합니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle>운동 분석</CardTitle>
                <CardDescription>
                  나의 운동 데이터를 분석해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  운동 분석 페이지로 이동합니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 