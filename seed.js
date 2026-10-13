import 'dotenv/config'; import mongoose from 'mongoose'; import bcrypt from 'bcryptjs'; import {User,ParkingSlot,Vehicle,Booking} from './models.js';
await mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/parkease');
const email=process.env.SEED_ADMIN_EMAIL||'admin@parkease.local';const password=process.env.SEED_ADMIN_PASSWORD||'ParkEase123!';let admin=await User.findOne({email});if(!admin)admin=await User.create({name:'ParkEase Admin',email,password:await bcrypt.hash(password,12),role:'admin'});
if(!await ParkingSlot.countDocuments()){const slots=Array.from({length:24},(_,i)=>({code:`${String.fromCharCode(65+Math.floor(i/8))}${String(i%8+1).padStart(2,'0')}`,zone:String.fromCharCode(65+Math.floor(i/8)),level:'Ground',type:i%8===7?'EV':'Standard',hourlyRate:i%8===7?6:4,status:'available'}));await ParkingSlot.insertMany(slots)}
console.log(`Seed complete. Admin: ${email} / ${password}`);await mongoose.disconnect();
