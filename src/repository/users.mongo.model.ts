import { Schema, model } from 'mongoose';
import { User } from '../entities/user';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  nick: {
    type: String,
  },

  isAlive: {
    type: Boolean,
    default: true,
  },
  allies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },   
  ],
  enemies: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
