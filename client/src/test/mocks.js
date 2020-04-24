export const UserMock = () => ({
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@gmail.com',
  username: 'johndoe',
  role: 'USER',
});

export const ErrorMock = () => ({
  response: {
    data: [{ email: ['User with this email address already exists'] }],
    status: 401,
  },
});