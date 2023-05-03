import bcrypt from 'bcrypt';

const salt = 10;

export const hashPass = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

export const comparePass = async (password, hashedPass) => {
  try {
    return await bcrypt.compare(password, hashedPass);
  } catch (error) {
    console.log(error);
  }
};
