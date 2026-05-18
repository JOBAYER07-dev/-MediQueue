import PrivateRoute from '@/components/shared/PrivateRoute';
import MyTutorsContent from '@/components/tutors/MyTutorsContent';

export const metadata = {
  title: 'My Tutors | MediQueue',
};

export default function MyTutorsPage() {
  return (
    <PrivateRoute>
      <MyTutorsContent />
    </PrivateRoute>
  );
}
