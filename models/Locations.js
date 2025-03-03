import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema ({
    Monday: { type: String, required: true },
    Tuesday: { type: String, required: true },
    Wednesday: { type: String, required: true },
    Thursday: { type: String, required: true },
    Friday: { type: String, required: true },
    Saturday: { type: String, required: true },
    Sunday: { type: String, required: true },
})

const LocationSchema = new mongoose.Schema ({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    postalcode: { type: String, required: true },
    phone: { type: String, required: true },
    schedule: { type: ScheduleSchema, required: true },
})

export default mongoose.models.Location || mongoose.model('Locations', LocationSchema)