"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Users, 
  UserPlus,
  ArrowRight,
  Calendar,
  Phone,
  Mail
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
  routines: number;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    joinDate: "2024-01-15",
    lastVisit: "2024-03-20",
    status: "active",
    routines: 3,
  },
  {
    id: "2",
    name: "김철수",
    email: "kim@example.com",
    phone: "010-2345-6789",
    joinDate: "2024-02-01",
    lastVisit: "2024-03-18",
    status: "active",
    routines: 2,
  },
  {
    id: "3",
    name: "이영희",
    email: "lee@example.com",
    phone: "010-3456-7890",
    joinDate: "2024-01-20",
    lastVisit: "2024-03-15",
    status: "inactive",
    routines: 1,
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeTab === "all" || client.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">클라이언트 관리</h1>
          <p className="text-muted-foreground mt-2">
            클라이언트 정보와 운동 루틴을 관리하세요.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/pro/clients/new">
            <UserPlus className="mr-2 h-4 w-4" />
            새 클라이언트 추가
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="클라이언트 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="active">활성</TabsTrigger>
            <TabsTrigger value="inactive">비활성</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{client.name}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  client.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {client.status === "active" ? "활성" : "비활성"}
                </span>
              </div>
              <CardDescription>
                {client.routines}개의 운동 루틴
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>마지막 방문: {client.lastVisit}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/pro/clients/${client.id}`}>
                    상세 보기
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/pro/clients/${client.id}/routines`}>
                    루틴 관리
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 