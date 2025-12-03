import { put, takeLatest, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
}

async function mockLogin(email: string, password: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); 
  
  if (email === 'admin@demo.com' && password === 'password') {
    return {
      id: '1',
      email,
      name: 'Aisha Agunbiade',
      avatar: 'AA',
      role: 'Administrator',
    };
  }
  
  // Allow any email/password for demo presentation
  if (email && password.length >= 6) {
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      id: Date.now().toString(),
      email,
      name,
      avatar: name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      role: 'User',
    };
  }
  
  throw new Error('Invalid credentials. Password must be at least 6 characters.');
}

function* handleLogin(action: PayloadAction<{ email: string; password: string }>) {
  try {
    yield delay(100); 
    const user: User = yield mockLogin(action.payload.email, action.payload.password);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'Login failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
