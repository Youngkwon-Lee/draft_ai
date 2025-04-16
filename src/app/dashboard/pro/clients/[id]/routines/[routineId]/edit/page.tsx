"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Clock,
  Calendar
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
};

export default function EditRoutinePage() {
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

  const handleAddExercise = () => {
    setRoutine({
      ...routine,
      exercises: [
        ...routine.exercises,
        {
          id: (routine.exercises.length + 1).toString(),
          name: "",
          sets: 3,
          reps: 10,
        },
      ],
    });
  };

  const handleRemoveExercise = (id: string) => {
    setRoutine({
      ...routine,
      exercises: routine.exercises.filter((exercise) => exercise.id !== id),
    });
  };

  const handleExerciseChange = (
    id: string,
    field: keyof Exercise,
    value: string | number
  ) => {
    setRoutine({
      ...routine,
      exercises: routine.exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출 구현
    router.push(`/dashboard/pro/clients/${clientId}/routines`);
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
          <h1 className="text-3xl font-bold">루틴 수정</h1>
          <p className="text-muted-foreground mt-2">
            운동 루틴을 수정하세요.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>
              루틴의 이름과 설명을 수정하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">루틴 이름</Label>
              <Input
                id="name"
                value={routine.name}
                onChange={(e) => setRoutine({ ...routine, name: e.target.value })}
                placeholder="예: 슬개건염 재활 루틴"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={routine.description}
                onChange={(e) => setRoutine({ ...routine, description: e.target.value })}
                placeholder="루틴에 대한 설명을 입력하세요."
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>운동 스케줄</CardTitle>
            <CardDescription>
              운동 빈도와 시간을 수정하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>운동 빈도</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={routine.frequency === "daily" ? "default" : "outline"}
                  onClick={() => setRoutine({ ...routine, frequency: "daily" })}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  매일
                </Button>
                <Button
                  type="button"
                  variant={routine.frequency === "weekly" ? "default" : "outline"}
                  onClick={() => setRoutine({ ...routine, frequency: "weekly" })}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  주간
                </Button>
              </div>
            </div>

            {routine.frequency === "daily" ? (
              <div className="space-y-2">
                <Label htmlFor="timesPerDay">하루 운동 횟수</Label>
                <Input
                  id="timesPerDay"
                  type="number"
                  min="1"
                  max="3"
                  value={routine.timesPerDay}
                  onChange={(e) => setRoutine({ ...routine, timesPerDay: Number(e.target.value) })}
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>운동 요일</Label>
                <div className="flex gap-2">
                  {["월", "화", "수", "목", "금", "토", "일"].map(
                    (day, index) => (
                      <Button
                        key={day}
                        type="button"
                        variant={
                          routine.selectedDays?.includes(index)
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setRoutine({
                            ...routine,
                            selectedDays: routine.selectedDays?.includes(index)
                              ? routine.selectedDays.filter((d) => d !== index)
                              : [...(routine.selectedDays || []), index],
                          })
                        }
                      >
                        {day}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>운동 목록</CardTitle>
            <CardDescription>
              루틴에 포함될 운동들을 수정하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {routine.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="grid gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">운동 {exercise.id}</h4>
                  {routine.exercises.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveExercise(exercise.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${exercise.id}`}>운동 이름</Label>
                    <Input
                      id={`name-${exercise.id}`}
                      value={exercise.name}
                      onChange={(e) =>
                        handleExerciseChange(exercise.id, "name", e.target.value)
                      }
                      placeholder="예: 스쿼트"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`sets-${exercise.id}`}>세트 수</Label>
                    <Input
                      id={`sets-${exercise.id}`}
                      type="number"
                      min="1"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleExerciseChange(
                          exercise.id,
                          "sets",
                          Number(e.target.value)
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`reps-${exercise.id}`}>횟수</Label>
                    <Input
                      id={`reps-${exercise.id}`}
                      type="number"
                      min="1"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleExerciseChange(
                          exercise.id,
                          "reps",
                          Number(e.target.value)
                        )
                      }
                      placeholder="횟수 또는 시간(초) 입력"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`notes-${exercise.id}`}>참고사항</Label>
                    <Input
                      id={`notes-${exercise.id}`}
                      value={exercise.notes || ""}
                      onChange={(e) =>
                        handleExerciseChange(exercise.id, "notes", e.target.value)
                      }
                      placeholder="자세, 각도 등 참고사항"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddExercise}
            >
              <Plus className="mr-2 h-4 w-4" />
              운동 추가
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button type="submit">루틴 수정</Button>
        </div>
      </form>
    </div>
  );
} 