"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  LogOut,
  MoonStar,
  Sun,
  Users,
  Dumbbell,
  BookOpen,
  Activity,
  GraduationCap,
  FilePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useToast } from '@/components/ui/use-toast';

export function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState<'user' | 'pro' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    // URL 경로에서 사용자 타입 확인
    const pathUserType = pathname.startsWith('/dashboard/pro') ? 'pro' : 'user';
    
    // Firebase 사용자 타입 확인
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const firebaseUserType = userData?.userType || null;
        
        // Firebase의 사용자 타입과 URL 경로의 사용자 타입이 일치하지 않으면 리다이렉트
        if (firebaseUserType && firebaseUserType !== pathUserType) {
          toast({
            title: "접근 권한이 없습니다",
            description: `${firebaseUserType === 'pro' ? '전문가' : '일반'} 사용자는 이 페이지에 접근할 수 없습니다.`,
            variant: "destructive",
          });
          router.push(`/dashboard/${firebaseUserType}`);
        }
        
        setUserType(firebaseUserType);
      } else {
        toast({
          title: "로그인이 필요합니다",
          description: "서비스를 이용하려면 먼저 로그인해주세요.",
          variant: "destructive",
        });
        router.push('/auth/signin');
      }
    });

    return () => unsubscribe();
  }, [pathname, router, toast]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth/signin');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const userRoutes = [
    {
      href: '/dashboard/user',
      label: '대시보드',
      icon: LayoutDashboard,
      color: 'text-sky-500',
    },
    {
      href: '/dashboard/user/exercise-routines',
      label: '내 운동 루틴',
      icon: Dumbbell,
      color: 'text-pink-700',
    },
    {
      href: '/dashboard/user/exercise-illustrations',
      label: '운동 일러스트',
      icon: Image,
      color: 'text-emerald-500',
    },
    {
      href: '/dashboard/user/education',
      label: '교육 자료',
      icon: GraduationCap,
      color: 'text-blue-500',
    },
    {
      href: '/dashboard/user/analysis',
      label: '운동 분석',
      icon: Activity,
      color: 'text-red-500',
    },
  ];

  const proRoutes = [
    {
      href: '/dashboard/pro',
      label: '대시보드',
      icon: LayoutDashboard,
      color: 'text-sky-500',
    },
    {
      href: '/dashboard/pro/clients',
      label: '클라이언트 관리',
      icon: Users,
      color: 'text-violet-500',
    },
    {
      href: '/dashboard/pro/exercise-routines',
      label: '운동 루틴 관리',
      icon: Dumbbell,
      color: 'text-pink-700',
    },
    {
      href: '/dashboard/pro/ai-images',
      label: 'AI 이미지 생성',
      icon: Image,
      color: 'text-orange-700',
    },
    {
      href: '/dashboard/pro/illustrations',
      label: '운동 일러스트 관리',
      icon: Image,
      color: 'text-emerald-500',
    },
    {
      href: '/dashboard/pro/education',
      label: '교육 자료 관리',
      icon: GraduationCap,
      color: 'text-blue-500',
    },
    {
      href: '/dashboard/pro/education-create',
      label: '교육 자료 생성',
      icon: FilePlus,
      color: 'text-yellow-500',
    },
    {
      href: '/dashboard/pro/analysis',
      label: '운동 분석',
      icon: Activity,
      color: 'text-red-500',
    },
  ];

  const routes = userType === 'pro' ? proRoutes : userRoutes;

  return (
    <aside className="flex flex-col h-full bg-card border-r border-border w-64 overflow-y-auto">
      <div className="p-4 border-b border-border">
        <Link href={`/dashboard/${userType}`} className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <h1 className="text-xl font-bold ml-2">Motion AI</h1>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <route.icon className={cn("h-4 w-4", route.color)} />
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                라이트 모드
              </>
            ) : (
              <>
                <MoonStar className="h-4 w-4 mr-2" />
                다크 모드
              </>
            )}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </div>
    </aside>
  );
}
