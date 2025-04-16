"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search,
  BookOpen,
  Download,
  Filter,
  Clock,
  CheckCircle2
} from "lucide-react";

interface EducationMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  createdAt: string;
  duration: string;
  isCompleted: boolean;
}

// TODO: 실제 API 호출로 대체
const mockMaterials: EducationMaterial[] = [
  {
    id: "1",
    title: "올바른 스쿼트 자세 가이드",
    description: "스쿼트의 기본 자세와 주의사항에 대한 상세 가이드",
    content: "스쿼트는 하체 운동의 기본이 되는 운동입니다...",
    category: "하체",
    createdAt: "2024-03-15",
    duration: "15분",
    isCompleted: true,
  },
  {
    id: "2",
    title: "코어 근육 강화의 중요성",
    description: "코어 근육의 역할과 효과적인 훈련 방법",
    content: "코어 근육은 우리 몸의 중심을 잡아주는 중요한 근육군입니다...",
    category: "코어",
    createdAt: "2024-03-14",
    duration: "20분",
    isCompleted: false,
  },
  {
    id: "3",
    title: "스트레칭의 과학",
    description: "효율적인 스트레칭 방법과 그 효과",
    content: "스트레칭은 운동 전후에 필수적인 요소입니다...",
    category: "스트레칭",
    createdAt: "2024-03-13",
    duration: "10분",
    isCompleted: false,
  },
];

const categories = ["전체", "상체", "하체", "코어", "스트레칭", "영양", "재활"];

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (id: string) => {
    // TODO: 실제 다운로드 기능 구현
    console.log(`Downloading material ${id}`);
  };

  const handleComplete = async (id: string) => {
    // TODO: 실제 완료 처리 기능 구현
    console.log(`Marking material ${id} as completed`);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">교육 자료</h1>
          <p className="text-muted-foreground mt-2">
            운동과 건강에 관한 교육 자료를 확인하고 학습하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>교육 자료 검색</CardTitle>
            <CardDescription>
              교육 자료를 검색하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="제목 또는 설명으로 검색"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredMaterials.map((material) => (
            <Card key={material.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                    {!material.isCompleted && (
                      <Button
                        onClick={() => handleComplete(material.id)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        완료하기
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>{material.category}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{material.duration}</span>
                    </div>
                    {material.isCompleted && (
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>학습 완료</span>
                      </div>
                    )}
                    <span className="ml-auto">{material.createdAt}</span>
                  </div>
                  <div className="prose max-w-none">
                    {material.content}
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