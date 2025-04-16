'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // 로그인한 사용자만 대시보드로 리다이렉트
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          if (userData?.userType) {
            router.push(`/dashboard/${userData.userType}`);
          }
        }
      } catch (error) {
        console.error('인증 처리 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            잠시만 기다려주세요...
          </p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 사용자를 위한 랜딩 페이지
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Motion AI에 오신 것을 환영합니다
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI 기반의 맞춤형 운동 관리 플랫폼으로 당신의 건강한 라이프스타일을 시작하세요.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/auth/signin">로그인</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
