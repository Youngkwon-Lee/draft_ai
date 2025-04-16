"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Dumbbell, 
  Image, 
  BookOpen, 
  Plus, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function ProDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">전문가 대시보드</h1>
          <p className="text-muted-foreground mt-2">
            환자 관리와 운동 프로그램을 효율적으로 관리하세요.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard/pro/clients">
              <Users className="mr-2 h-4 w-4" />
              클라이언트 관리
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/pro/exercise-routines">
              <Dumbbell className="mr-2 h-4 w-4" />
              운동 루틴
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="clients">클라이언트</TabsTrigger>
          <TabsTrigger value="routines">운동 루틴</TabsTrigger>
          <TabsTrigger value="education">교육자료</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>활성 클라이언트</CardTitle>
                <CardDescription>현재 관리 중인 클라이언트</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12명</div>
                <p className="text-xs text-muted-foreground">
                  지난 주 대비 +2명
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>생성된 루틴</CardTitle>
                <CardDescription>이번 달 생성된 운동 루틴</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24개</div>
                <p className="text-xs text-muted-foreground">
                  지난 달 대비 +5개
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>교육자료</CardTitle>
                <CardDescription>이번 달 생성된 교육자료</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8개</div>
                <p className="text-xs text-muted-foreground">
                  지난 달 대비 +3개
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>최근 생성된 루틴</CardTitle>
                <CardDescription>최근 7일간 생성된 운동 루틴</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* TODO: 실제 데이터로 대체 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">슬개건염 재활 루틴</p>
                      <p className="text-sm text-muted-foreground">홍길동 환자</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>최근 교육자료</CardTitle>
                <CardDescription>최근 7일간 생성된 교육자료</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* TODO: 실제 데이터로 대체 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">코어 안정성 운동 가이드</p>
                      <p className="text-sm text-muted-foreground">2일 전</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: 클라이언트 목록 구현 */}
          </div>
        </TabsContent>

        <TabsContent value="routines">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: 운동 루틴 목록 구현 */}
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: 교육자료 목록 구현 */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 