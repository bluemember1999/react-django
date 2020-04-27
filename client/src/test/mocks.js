export const UserMock = (id = 1) => ({
  id,
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@gmail.com',
  username: 'johndoe',
  role: 'USER',
  key: id,
});

export const TimezoneMock = (id = 1) => ({
  id,
  name: `John's timezone`,
  name_of_city: 'Montreal',
  difference_to_GMT: '-4',
  key: id,
});

export const ErrorMock = () => ({
  response: {
    data: [{ email: ['User with this email address already exists'] }],
    status: 401,
  },
});