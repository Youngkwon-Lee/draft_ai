"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Download,
  Image as ImageIcon,
  Filter
} from "lucide-react";

interface Illustration {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

// TODO: 실제 API 호출로 대체
const mockIllustrations: Illustration[] = [
  {
    id: "1",
    name: "스쿼트 자세",
    description: "올바른 스쿼트 자세 일러스트레이션",
    imageUrl: "https://example.com/squat.jpg",
    category: "하체",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    name: "플랭크 자세",
    description: "올바른 플랭크 자세 일러스트레이션",
    imageUrl: "https://example.com/plank.jpg",
    category: "코어",
    createdAt: "2024-03-14",
  },
  {
    id: "3",
    name: "푸시업 자세",
    description: "올바른 푸시업 자세 일러스트레이션",
    imageUrl: "https://example.com/pushup.jpg",
    category: "상체",
    createdAt: "2024-03-13",
  },
];

const categories = ["전체", "상체", "하체", "코어", "스트레칭"];

export default function ExerciseIllustrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredIllustrations = mockIllustrations.filter((illustration) => {
    const matchesSearch = illustration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      illustration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || illustration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (id: string) => {
    // TODO: 실제 다운로드 기능 구현
    console.log(`Downloading illustration ${id}`);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">운동 일러스트레이션</h1>
          <p className="text-muted-foreground mt-2">
            운동 자세를 확인하고 일러스트레이션을 다운로드하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>일러스트레이션 검색</CardTitle>
            <CardDescription>
              운동 일러스트레이션을 검색하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="운동 이름 또는 설명으로 검색"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIllustrations.map((illustration) => (
            <Card key={illustration.id}>
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={illustration.imageUrl}
                  alt={illustration.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex h-full items-center justify-center">
                    <Button
                      variant="secondary"
                      onClick={() => handleDownload(illustration.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{illustration.name}</CardTitle>
                <CardDescription>{illustration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>{illustration.category}</span>
                  <span className="ml-auto">{illustration.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 