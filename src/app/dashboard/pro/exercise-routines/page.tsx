"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Edit,
  Trash2,
  Loader2,
  Search
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration: number;
  notes: string;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  createdAt: string;
  status: "active" | "completed";
}

// TODO: 실제 API 호출로 대체
const mockRoutines: Routine[] = [
  {
    id: "1",
    name: "슬개건염 재활 루틴",
    description: "슬개건염 재활을 위한 기본 운동 루틴",
    exercises: [
      {
        id: "1",
        name: "스쿼트",
        sets: 3,
        reps: 10,
        duration: 0,
        notes: "무릎이 발끝을 넘지 않도록 주의",
      },
      {
        id: "2",
        name: "레그 익스텐션",
        sets: 3,
        reps: 12,
        duration: 0,
        notes: "천천히 컨트롤하며 수행",
      },
    ],
    createdAt: "2024-03-15",
    status: "active",
  },
  {
    id: "2",
    name: "코어 안정성 루틴",
    description: "코어 근육 강화를 위한 안정성 운동 루틴",
    exercises: [
      {
        id: "3",
        name: "플랭크",
        sets: 3,
        reps: 0,
        duration: 30,
        notes: "30초씩 3세트",
      },
      {
        id: "4",
        name: "사이드 플랭크",
        sets: 3,
        reps: 0,
        duration: 20,
        notes: "양쪽 20초씩 3세트",
      },
    ],
    createdAt: "2024-03-14",
    status: "completed",
  },
];

export default function ExerciseRoutinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);

  const filteredRoutines = routines.filter((routine) => {
    const matchesSearch = routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = routine.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 운동 루틴을 삭제하시겠습니까?")) {
      // TODO: API 호출 구현
      setRoutines(routines.filter((routine) => routine.id !== id));
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">운동 루틴</h1>
          <p className="text-muted-foreground mt-2">
            클라이언트를 위한 운동 루틴을 관리하세요.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          새 루틴 생성
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>루틴 검색</CardTitle>
            <CardDescription>
              운동 루틴을 검색하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="루틴 이름 또는 설명으로 검색"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "active" ? "default" : "outline"}
                  onClick={() => setActiveTab("active")}
                >
                  진행 중
                </Button>
                <Button
                  variant={activeTab === "completed" ? "default" : "outline"}
                  onClick={() => setActiveTab("completed")}
                >
                  완료
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredRoutines.map((routine) => (
            <Card key={routine.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{routine.name}</CardTitle>
                    <CardDescription>{routine.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(routine.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      삭제
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>생성일: {routine.createdAt}</span>
                    <span>운동 수: {routine.exercises.length}</span>
                  </div>
                  <div className="grid gap-2">
                    {routine.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exercise.sets}세트 ×{" "}
                            {exercise.reps > 0
                              ? `${exercise.reps}회`
                              : `${exercise.duration}초`}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exercise.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 