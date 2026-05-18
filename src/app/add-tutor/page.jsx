import PrivateRoute from '@/components/shared/PrivateRoute';
import AddTutorContent from '@/components/tutors/AddTutorContent';

export const metadata = {
  title: 'Add Tutor | MediQueue',
};

export default function AddTutorPage() {
  return (
    <PrivateRoute>
      <AddTutorContent />
    </PrivateRoute>
  );
}
