"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Download,
  Loader2
} from "lucide-react";

interface EducationalMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  createdAt: string;
}

// TODO: 실제 API 호출로 대체
const mockMaterials: EducationalMaterial[] = [
  {
    id: "1",
    title: "슬개건염 재활 가이드",
    description: "슬개건염 재활을 위한 운동과 주의사항에 대한 가이드",
    content: "슬개건염은 무릎 앞쪽의 슬개골과 대퇴골을 연결하는 힘줄에 발생하는 염증입니다...",
    category: "재활",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "코어 안정성 운동 가이드",
    description: "코어 근육 강화를 위한 안정성 운동 가이드",
    content: "코어 안정성은 몸의 중심을 지탱하고 균형을 유지하는 데 중요한 역할을 합니다...",
    category: "운동",
    createdAt: "2024-03-14",
  },
];

export default function EducationPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("운동");
  const [isGenerating, setIsGenerating] = useState(false);
  const [materials, setMaterials] = useState<EducationalMaterial[]>(mockMaterials);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // TODO: API 호출 구현
    setTimeout(() => {
      setMaterials([
        {
          id: (materials.length + 1).toString(),
          title,
          description,
          content,
          category,
          createdAt: new Date().toISOString().split("T")[0],
        },
        ...materials,
      ]);
      setTitle("");
      setDescription("");
      setContent("");
      setIsGenerating(false);
    }, 2000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 교육 자료를 삭제하시겠습니까?")) {
      // TODO: API 호출 구현
      setMaterials(materials.filter((material) => material.id !== id));
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">교육 자료</h1>
          <p className="text-muted-foreground mt-2">
            클라이언트를 위한 교육 자료를 생성하고 관리하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>새 교육 자료</CardTitle>
            <CardDescription>
              새로운 교육 자료를 생성하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 슬개건염 재활 가이드"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="교육 자료에 대한 간단한 설명"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={category === "운동" ? "default" : "outline"}
                    onClick={() => setCategory("운동")}
                  >
                    운동
                  </Button>
                  <Button
                    type="button"
                    variant={category === "재활" ? "default" : "outline"}
                    onClick={() => setCategory("재활")}
                  >
                    재활
                  </Button>
                  <Button
                    type="button"
                    variant={category === "영양" ? "default" : "outline"}
                    onClick={() => setCategory("영양")}
                  >
                    영양
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="교육 자료의 상세 내용을 입력하세요."
                  className="min-h-[200px]"
                  required
                />
              </div>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    자료 생성
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>교육 자료 목록</CardTitle>
            <CardDescription>
              생성된 교육 자료들을 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{material.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {material.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{material.category}</span>
                      <span>생성일: {material.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(material.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 