import { ethers } from 'ethers'
import { url, adress, abi } from './config';

const provider = new ethers.providers.JsonRpcProvider(url);

const contract = new ethers.Contract(adress, abi, provider);

async function getBookingCount() {
    try {
        const count = await contract.bookingCount()
        return count
    } catch (error) {
        console.error('Error getting number of bookings', error);
    }
}

async function getBooking(id) {
    try {
        const booking = await contract.bookings(id)
        return booking
        
    } catch (error) {
        console.error('Could not get the booking', error);
    }
}