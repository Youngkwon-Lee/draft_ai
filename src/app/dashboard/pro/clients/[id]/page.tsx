"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Edit,
  Trash2,
  Dumbbell,
  FileText,
  History
} from "lucide-react";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastVisit: string;
  status: "active" | "inactive";
  notes: string;
  routines: {
    id: string;
    name: string;
    createdAt: string;
    status: "active" | "completed";
  }[];
}

const mockClient: Client = {
  id: "1",
  name: "홍길동",
  email: "hong@example.com",
  phone: "010-1234-5678",
  joinDate: "2024-01-15",
  lastVisit: "2024-03-20",
  status: "active",
  notes: "슬개건염 재활 중. 주 2회 방문. 코어 안정성 운동 필요.",
  routines: [
    {
      id: "1",
      name: "슬개건염 재활 루틴",
      createdAt: "2024-03-15",
      status: "active",
    },
    {
      id: "2",
      name: "코어 안정성 운동",
      createdAt: "2024-03-10",
      status: "active",
    },
    {
      id: "3",
      name: "초기 재활 운동",
      createdAt: "2024-01-20",
      status: "completed",
    },
  ],
};

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/pro/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            클라이언트 목록
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{mockClient.name}</h1>
          <p className="text-muted-foreground mt-2">
            클라이언트 정보와 운동 루틴을 관리하세요.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/pro/clients/${clientId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              수정
            </Link>
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">기본 정보</TabsTrigger>
          <TabsTrigger value="routines">운동 루틴</TabsTrigger>
          <TabsTrigger value="history">이력</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>연락처 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{mockClient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{mockClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>가입일: {mockClient.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>마지막 방문: {mockClient.lastVisit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>메모</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {mockClient.notes}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routines">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>운동 루틴</CardTitle>
                  <Button asChild>
                    <Link href={`/dashboard/pro/clients/${clientId}/routines/new`}>
                      <Dumbbell className="mr-2 h-4 w-4" />
                      새 루틴 추가
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClient.routines.map((routine) => (
                    <div
                      key={routine.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{routine.name}</p>
                        <p className="text-sm text-muted-foreground">
                          생성일: {routine.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          routine.status === "active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {routine.status === "active" ? "진행 중" : "완료"}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/pro/clients/${clientId}/routines/${routine.id}`}>
                            상세 보기
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>방문 이력</CardTitle>
              <CardDescription>
                클라이언트의 방문 기록과 운동 진행 상황을 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* TODO: 방문 이력 구현 */}
                <div className="text-center text-muted-foreground">
                  방문 이력이 없습니다.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 