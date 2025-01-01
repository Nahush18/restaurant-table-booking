import BookingForm from './components/BookingForm';
import Availability from './components/Availability';

const Home = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-6">Restaurant Table Booking System</h1>
            <BookingForm />
            <Availability />
        </div>
    );
};

export default Home;
