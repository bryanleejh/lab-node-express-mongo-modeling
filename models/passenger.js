import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
