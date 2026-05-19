import PrivateRoute from '@/components/shared/PrivateRoute';
import MyBookingsContent from '@/components/tutors/MyBookingsContent';

export const metadata = {
  title: 'My Bookings | MediQueue',
};

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
