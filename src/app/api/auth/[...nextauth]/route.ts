import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요' },
        { status: 400 }
      );
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 사용자 정보를 세션에 저장
    const session = {
      user: {
        id: user.uid,
        email: user.email,
        name: user.displayName || '',
        role: 'user' // 기본 역할 설정
      }
    };

    return NextResponse.json(session);
  } catch (error: any) {
    let errorMessage = '로그인 중 오류가 발생했습니다';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = '등록되지 않은 사용자입니다';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = '비밀번호가 일치하지 않습니다';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 401 }
    );
  }
}
