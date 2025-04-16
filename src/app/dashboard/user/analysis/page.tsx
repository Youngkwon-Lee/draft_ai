"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  LineChart,
  Calendar,
  Target,
  TrendingUp,
  Award
} from "lucide-react";

interface ExerciseData {
  date: string;
  count: number;
  duration: number;
  calories: number;
}

interface ProgressData {
  date: string;
  weight: number;
  muscleMass: number;
  bodyFat: number;
}

// TODO: 실제 API 호출로 대체
const mockExerciseData: ExerciseData[] = [
  { date: "2024-03-01", count: 5, duration: 45, calories: 300 },
  { date: "2024-03-02", count: 3, duration: 30, calories: 200 },
  { date: "2024-03-03", count: 4, duration: 40, calories: 280 },
  { date: "2024-03-04", count: 6, duration: 50, calories: 350 },
  { date: "2024-03-05", count: 2, duration: 20, calories: 150 },
  { date: "2024-03-06", count: 4, duration: 35, calories: 250 },
  { date: "2024-03-07", count: 5, duration: 45, calories: 320 },
];

const mockProgressData: ProgressData[] = [
  { date: "2024-03-01", weight: 70, muscleMass: 30, bodyFat: 20 },
  { date: "2024-03-07", weight: 69, muscleMass: 31, bodyFat: 19 },
];

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("exercise");

  const calculateStats = () => {
    const totalExercises = mockExerciseData.reduce((sum, data) => sum + data.count, 0);
    const totalDuration = mockExerciseData.reduce((sum, data) => sum + data.duration, 0);
    const totalCalories = mockExerciseData.reduce((sum, data) => sum + data.calories, 0);
    const averageDuration = totalDuration / mockExerciseData.length;

    return {
      totalExercises,
      totalDuration,
      totalCalories,
      averageDuration,
    };
  };

  const stats = calculateStats();

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">운동 분석</h1>
          <p className="text-muted-foreground mt-2">
            운동 데이터와 신체 변화를 분석하고 확인하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 운동 횟수</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalExercises}회</div>
              <p className="text-xs text-muted-foreground">
                지난 7일간의 운동 횟수
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 운동 시간</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDuration}분</div>
              <p className="text-xs text-muted-foreground">
                평균 {stats.averageDuration.toFixed(1)}분/일
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">소모 칼로리</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCalories}kcal</div>
              <p className="text-xs text-muted-foreground">
                지난 7일간의 칼로리 소모
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">체중 변화</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockProgressData[1].weight - mockProgressData[0].weight}kg
              </div>
              <p className="text-xs text-muted-foreground">
                지난 7일간의 체중 변화
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="exercise" className="space-y-4">
          <TabsList>
            <TabsTrigger value="exercise" onClick={() => setActiveTab("exercise")}>
              운동 데이터
            </TabsTrigger>
            <TabsTrigger value="progress" onClick={() => setActiveTab("progress")}>
              신체 변화
            </TabsTrigger>
          </TabsList>
          <TabsContent value="exercise" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>일일 운동 현황</CardTitle>
                <CardDescription>
                  지난 7일간의 운동 데이터를 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {/* TODO: 차트 라이브러리로 대체 */}
                  <p className="text-muted-foreground">운동 데이터 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>신체 변화 추이</CardTitle>
                <CardDescription>
                  체중, 근육량, 체지방률의 변화를 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {/* TODO: 차트 라이브러리로 대체 */}
                  <p className="text-muted-foreground">신체 변화 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>운동 목표 달성률</CardTitle>
            <CardDescription>
              주간 운동 목표 달성 현황을 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>주간 운동 횟수 목표</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">5회</span>
                  <span className="text-muted-foreground">/ 7회</span>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: "71%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 