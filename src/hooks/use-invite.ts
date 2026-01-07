export const inviteCode = (len: number): string => {
  let code = "";
  const mystring =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62);
    code += mystring[num];
  }

  return code;
};
