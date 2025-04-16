"use client";

import { useState } from "react";
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

export default function NewRoutinePage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "1", name: "", sets: 3, reps: 10 },
  ]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: (exercises.length + 1).toString(),
        name: "",
        sets: 3,
        reps: 10,
      },
    ]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleExerciseChange = (
    id: string,
    field: keyof Exercise,
    value: string | number
  ) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
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
          <h1 className="text-3xl font-bold">새 운동 루틴</h1>
          <p className="text-muted-foreground mt-2">
            클라이언트를 위한 새로운 운동 루틴을 생성하세요.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>
              루틴의 이름과 설명을 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">루틴 이름</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 슬개건염 재활 루틴"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              운동 빈도와 시간을 설정하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>운동 빈도</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={frequency === "daily" ? "default" : "outline"}
                  onClick={() => setFrequency("daily")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  매일
                </Button>
                <Button
                  type="button"
                  variant={frequency === "weekly" ? "default" : "outline"}
                  onClick={() => setFrequency("weekly")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  주간
                </Button>
              </div>
            </div>

            {frequency === "daily" ? (
              <div className="space-y-2">
                <Label htmlFor="timesPerDay">하루 운동 횟수</Label>
                <Input
                  id="timesPerDay"
                  type="number"
                  min="1"
                  max="3"
                  value={timesPerDay}
                  onChange={(e) => setTimesPerDay(Number(e.target.value))}
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
                          selectedDays.includes(index)
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setSelectedDays(
                            selectedDays.includes(index)
                              ? selectedDays.filter((d) => d !== index)
                              : [...selectedDays, index]
                          )
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
              루틴에 포함될 운동들을 추가하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="grid gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">운동 {exercise.id}</h4>
                  {exercises.length > 1 && (
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
          <Button type="submit">루틴 생성</Button>
        </div>
      </form>
    </div>
  );
} 