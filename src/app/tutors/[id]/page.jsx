import PrivateRoute from '@/components/shared/PrivateRoute';
import TutorDetailsContent from '@/components/tutors/TutorDetailsContent';

export default function TutorDetailsPage() {
  return (
    <PrivateRoute>
      <TutorDetailsContent />
    </PrivateRoute>
  );
}
