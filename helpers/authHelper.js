import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try {
        // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        // const salt = 10;
    const salt = await bcrypt.genSaltSync(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
} catch (error) {
    console.log(error);
}
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

// validate.js

export function validateRegistrationInput(data) {
    const { name, email, password, phone, address, answer} = data;
    const message = {};
  
    if (!name) {
      message.name = 'Name is required';
    }
  
    if (!email) {
      message.email = 'Email is required';
    }
  
    if (!password) {
      message.password = 'Password is required';
    }
  
    if (!phone) {
      message.phone = 'Phone is required';
    }
  
    if (!address) {
      message.address = 'Address is required';
    }

    if (!answer) {
      message.address = 'Answer is required';
    }
  
    return {
      message,
      isValid: Object.keys(message).length === 0,
    };
  }