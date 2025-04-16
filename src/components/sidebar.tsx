import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Dumbbell,
  Image,
  GraduationCap,
  LineChart,
  Users,
  FileText,
  Settings,
  LogOut,
  MoonStar,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState<'user' | 'pro' | null>(null);

  useEffect(() => {
    setMounted(true);
    // 사용자 타입 확인
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setUserType(userData?.userType || null);
      } else {
        setUserType(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
    },
    {
      href: '/dashboard/user/exercise-routines',
      label: '내 운동 루틴',
      icon: Dumbbell,
    },
    {
      href: '/dashboard/user/exercise-illustrations',
      label: '운동 일러스트',
      icon: Image,
    },
    {
      href: '/dashboard/user/education',
      label: '교육 자료',
      icon: GraduationCap,
    },
    {
      href: '/dashboard/user/analysis',
      label: '운동 분석',
      icon: LineChart,
    },
  ];

  const proRoutes = [
    {
      href: '/dashboard/pro',
      label: '대시보드',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/pro/clients',
      label: '클라이언트 관리',
      icon: Users,
    },
    {
      href: '/dashboard/pro/exercise-routines',
      label: '운동 루틴 관리',
      icon: Dumbbell,
    },
    {
      href: '/dashboard/pro/ai-images',
      label: 'AI 이미지 생성',
      icon: Image,
    },
    {
      href: '/dashboard/pro/illustrations',
      label: '운동 일러스트 관리',
      icon: Image,
    },
    {
      href: '/dashboard/pro/education',
      label: '교육 자료 관리',
      icon: GraduationCap,
    },
    {
      href: '/dashboard/pro/education-create',
      label: '교육 자료 생성',
      icon: FileText,
    },
    {
      href: '/dashboard/pro/analysis',
      label: '운동 분석',
      icon: LineChart,
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
                <route.icon className="h-4 w-4" />
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
