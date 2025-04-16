import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';

export async function GET() {
  try {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 