import mongoose from 'mongoose';
// import Flight from './flight';

const terminalSchema = new mongoose.Schema({
  name: String,
  flights: [{ type: mongoose.Schema.ObjectId, ref: 'Flight' }],
  capacity: Number
});

const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;
