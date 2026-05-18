import PrivateRoute from '@/components/shared/PrivateRoute';
import MyBookingsContent from '@/components/tutors/MyBookingsContent'; // অথবা আপনার সঠিক পাথ

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
