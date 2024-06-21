type User = {
  email: string;
  password: string;
};

const users: User[] = [
  {
    email: "atapas@email.com",
    password: "password",
  },
  {
    email: "alex@email.com",
    password: "password",
  },
  {
    email: "bob@email.com",
    password: "password",
  },
];

export const getUserByEmail = (email: string): User | undefined => {
  const found = users.find((user) => user.email === email);
  return found;
};
