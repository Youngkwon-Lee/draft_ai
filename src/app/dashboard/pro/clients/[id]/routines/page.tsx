"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Dumbbell,
  Plus,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  notes?: string;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "active" | "completed";
  exercises: Exercise[];
  schedule: {
    frequency: "daily" | "weekly";
    days?: number[];
    timesPerDay: number;
  };
}

const mockRoutines: Routine[] = [
  {
    id: "1",
    name: "슬개건염 재활 루틴",
    description: "슬개건염 재활을 위한 맞춤형 운동 루틴",
    createdAt: "2024-03-15",
    status: "active",
    exercises: [
      {
        id: "1",
        name: "쿼드 세트",
        sets: 3,
        reps: 10,
        notes: "무릎 각도 30도 유지",
      },
      {
        id: "2",
        name: "스텝 업",
        sets: 3,
        reps: 12,
        notes: "10cm 높이의 스텝 사용",
      },
      {
        id: "3",
        name: "월 시트",
        sets: 3,
        reps: 30,
        notes: "등을 벽에 붙이고 무릎 90도 유지",
      },
    ],
    schedule: {
      frequency: "daily",
      timesPerDay: 2,
    },
  },
  {
    id: "2",
    name: "코어 안정성 운동",
    description: "코어 근육 강화를 위한 안정성 운동",
    createdAt: "2024-03-10",
    status: "active",
    exercises: [
      {
        id: "4",
        name: "플랭크",
        sets: 3,
        duration: 30,
        notes: "엉덩이 높이 유지",
      },
      {
        id: "5",
        name: "버드독",
        sets: 3,
        reps: 10,
        notes: "대각선 팔다리 교차",
      },
    ],
    schedule: {
      frequency: "weekly",
      days: [1, 3, 5],
      timesPerDay: 1,
    },
  },
];

export default function ClientRoutinesPage() {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/pro/clients/${clientId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            클라이언트 상세
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">운동 루틴 관리</h1>
          <p className="text-muted-foreground mt-2">
            클라이언트의 운동 루틴을 관리하세요.
          </p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/pro/clients/${clientId}/routines/new`}>
            <Plus className="mr-2 h-4 w-4" />
            새 루틴 추가
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">진행 중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-4">
            {mockRoutines
              .filter((routine) => routine.status === "active")
              .map((routine) => (
                <Card key={routine.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{routine.name}</CardTitle>
                        <CardDescription>{routine.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/pro/clients/${clientId}/routines/${routine.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>생성일: {routine.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {routine.schedule.frequency === "daily"
                              ? `매일 ${routine.schedule.timesPerDay}회`
                              : `주 ${routine.schedule.days?.length}회 (${routine.schedule.days?.join(", ")}요일)`}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">운동 목록</h4>
                        <div className="space-y-2">
                          {routine.exercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              className="flex items-center justify-between p-2 border rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{exercise.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {exercise.sets}세트 ×{" "}
                                  {exercise.reps
                                    ? `${exercise.reps}회`
                                    : `${exercise.duration}초`}
                                </p>
                              </div>
                              {exercise.notes && (
                                <p className="text-sm text-muted-foreground">
                                  {exercise.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-4">
            {mockRoutines
              .filter((routine) => routine.status === "completed")
              .map((routine) => (
                <Card key={routine.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{routine.name}</CardTitle>
                        <CardDescription>{routine.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          완료됨
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/pro/clients/${clientId}/routines/${routine.id}`}>
                            상세 보기
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>생성일: {routine.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 