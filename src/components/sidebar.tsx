import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Building2,
  Search,
  LogOut,
  MoonStar,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn, signOut, auth } from '@/lib/auth';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const routes = [
    {
      href: '/',
      label: '대시보드',
      icon: LayoutDashboard,
    },
    {
      href: '/posts',
      label: '블로그 글',
      icon: FileText,
    },
    {
      href: '/ai-content',
      label: 'AI 콘텐츠',
      icon: FileText,
    },
    {
      href: '/ai-image',
      label: 'AI 이미지',
      icon: Image,
    },
    {
      href: '/business',
      label: '비즈니스',
      icon: Building2,
    },
    {
      href: '/keyword-analysis',
      label: '키워드 분석',
      icon: Search,
    },
  ];

  return (
    <aside className="flex flex-col h-full bg-card border-r border-border w-64 overflow-y-auto">
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
          <h1 className="text-xl font-bold ml-2">Draft AI</h1>
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
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {mounted && isDark ? (
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
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </div>
    </aside>
  );
}
