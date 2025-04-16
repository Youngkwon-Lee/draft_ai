import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요' },
        { status: 400 }
      );
    }

    // Firebase Auth로 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: name,
      role: 'user',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      message: '회원가입이 완료되었습니다',
      user: {
        id: user.uid,
        email: user.email,
        name: name,
        role: 'user'
      }
    });
  } catch (error: any) {
    let errorMessage = '회원가입 중 오류가 발생했습니다';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = '이미 사용 중인 이메일입니다';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = '비밀번호가 너무 약합니다';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
} 