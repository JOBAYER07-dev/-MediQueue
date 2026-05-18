'use client';
import PrivateRoute from '@/components/shared/PrivateRoute';
import MyTutorsContent from '@/components/tutors/MyTutorsContent';

export default function MyTutorsPage() {
  return (
    <PrivateRoute>
      <MyTutorsContent />
    </PrivateRoute>
  );
}
