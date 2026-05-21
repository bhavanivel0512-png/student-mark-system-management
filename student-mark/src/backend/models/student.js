import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollno: { type: String, required: true },
    class: { type: String, required: true },
    
    mark: {
      tamil: { type: Number, default: 0 },
      english: { type: Number, default: 0 },
      maths: { type: Number, default: 0 },
      science: { type: Number, default: 0 },
      social: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);