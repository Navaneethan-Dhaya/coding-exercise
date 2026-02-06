export interface User {
  username: string;
  passwordHash: string;
}

export const users: User[] = [
  {
    username: 'admin',
    // password: admin
    passwordHash: '$2b$10$.niEkQ4xTpRPYWSB985k3.tXwQfMYRTMlkM3qBZEq3BxO/6plwjmK',
  },
  {
    username: 'user1',
    // password: password1
    passwordHash: '$2b$10$RE4pYXUTiqZmRzsRfvCNru/6Jof30QNpre27cK1zlwLCY4zZl/2rK',
  },
];
