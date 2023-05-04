import bcrypt from 'bcrypt';

const salt = 10;

export const hashPass = async (password:string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

export const comparePass = async (password:string, hashedPass:string) => {
  try {
    return await bcrypt.compare(password, hashedPass);
  } catch (error) {
    console.log(error);
  }
};
