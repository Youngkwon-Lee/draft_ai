"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Dumbbell
} from "lucide-react";
import Link from "next/link";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  duration?: number;
  notes?: string;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  frequency: "daily" | "weekly";
  timesPerDay?: number;
  selectedDays?: number[];
  exercises: Exercise[];
  createdAt: string;
  status: "active" | "completed";
}

// TODO: 실제 API 호출로 대체
const mockRoutine: Routine = {
  id: "1",
  name: "슬개건염 재활 루틴",
  description: "슬개건염 재활을 위한 맞춤형 운동 루틴",
  frequency: "daily",
  timesPerDay: 2,
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
      duration: 30,
      notes: "등을 벽에 붙이고 무릎 90도 유지",
    },
  ],
  createdAt: "2024-03-15",
  status: "active",
};

export default function RoutineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  const routineId = params.routineId as string;

  const [routine, setRoutine] = useState<Routine>(mockRoutine);

  useEffect(() => {
    // TODO: API 호출로 루틴 데이터 가져오기
    // const fetchRoutine = async () => {
    //   const response = await fetch(`/api/clients/${clientId}/routines/${routineId}`);
    //   const data = await response.json();
    //   setRoutine(data);
    // };
    // fetchRoutine();
  }, [clientId, routineId]);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 루틴을 삭제하시겠습니까?")) {
      // TODO: API 호출 구현
      router.push(`/dashboard/pro/clients/${clientId}/routines`);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/pro/clients/${clientId}/routines`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            루틴 목록
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{routine.name}</h1>
          <p className="text-muted-foreground mt-2">
            {routine.description}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/pro/clients/${clientId}/routines/${routineId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              수정
            </Link>
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>
              루틴의 기본 정보를 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>생성일: {routine.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {routine.frequency === "daily"
                    ? `매일 ${routine.timesPerDay}회`
                    : `주 ${routine.selectedDays?.length}회 (${routine.selectedDays?.map(day => ["월", "화", "수", "목", "금", "토", "일"][day]).join(", ")}요일)`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span>운동 수: {routine.exercises.length}개</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>운동 목록</CardTitle>
            <CardDescription>
              루틴에 포함된 운동들을 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {routine.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="grid gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{exercise.name}</h4>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">세트 수</p>
                    <p className="text-sm text-muted-foreground">{exercise.sets}세트</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">횟수/시간</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.reps ? `${exercise.reps}회` : `${exercise.duration}초`}
                    </p>
                  </div>
                  {exercise.notes && (
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-sm font-medium">참고사항</p>
                      <p className="text-sm text-muted-foreground">{exercise.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 