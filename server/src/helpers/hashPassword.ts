import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => await bcrypt.compare(password, passwordHash);

export { comparePassword, hashPassword };
