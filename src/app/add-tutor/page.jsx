'use client';
import PrivateRoute from '@/components/shared/PrivateRoute';
import AddTutorContent from '@/components/tutors/AddTutorContent';

export default function AddTutorPage() {
  return (
    <PrivateRoute>
      <AddTutorContent />
    </PrivateRoute>
  );
}
