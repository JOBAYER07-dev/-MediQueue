'use client';
import PrivateRoute from '@/components/shared/PrivateRoute';
import MyBookingsContent from '@/components/tutors/MyBookingsContent';

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
