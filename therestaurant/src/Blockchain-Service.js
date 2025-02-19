import { ethers } from 'ethers';
import { url, adress, abi } from './config';

const provider = new ethers.providers.JsonRpcProvider(url);

const signer = provider.getSigner();

const contract = new ethers.Contract(adress, abi, signer);

async function createRestaurant(name) {
  try {
    const tx = await contract.createRestaurant(name);
    const receipt = await tx.wait();

    // Check if restaurant has been created
    if (receipt.events[0].args[0]) {
      return Number(receipt.events[0].args.id); // Return the ID
    }
  } catch (error) {
    console.error('Could not create restaurant: ', error);
    return null;
  }
}


async function getBookingCount() {
  try {
    const count = await contract.bookingCount();
    return count;
  } catch (error) {
    console.error('Error getting number of bookings: ', error);
  }
}

async function getBookings(restaurantId) {
  try {
    const bookings = await contract.getBookings(restaurantId);
    return bookings;
  } catch (error) {
    console.error('Error getting number of bookings: ', error);
  }
}

async function getBooking(id) {
  try {
    const booking = await contract.bookings(id);
    return booking;
  } catch (error) {
    console.error('Could not get the booking: ', error);
  }
}

async function createBooking(numberOfGuests, name, date, time, restaurantId) {
  try {
    const tx = await contract.createBooking(
      numberOfGuests,
      name,
      date,
      time,
      restaurantId
    );
    await tx.wait();
    console.log('Booking Created: ', name);
  } catch (error) {
    console.error('Error creating booking: ', error);
  }
}

async function removeBooking(id) {
  try {
    const tx = await contract.removeBooking(id);
    const receipt = await tx.wait();
    return receipt.events[0].args[0]
  } catch (error) {
    console.error('Could not remove booking: ', error);
    return null;
  }
}

async function updateBooking(id, numberOfGuests, name, date, time) {
  try {
    const tx = await contract.editBooking(id, numberOfGuests, name, date, time);
    await tx.wait();
    console.log('Booking with id ', id, 'has been updated');
  } catch (error) {
    console.error('Could not update booking: ', error);
  }
}

export {
  createRestaurant,
  createBooking,
  getBookingCount,
  getBooking,
  getBookings,
  removeBooking,
  updateBooking as updateBookingBlock,
};
