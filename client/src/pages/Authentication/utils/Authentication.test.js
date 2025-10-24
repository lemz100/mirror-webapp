import { validateSignupForm } from './validation';

/**
 * Test scripts for validating signup inputs.
 */
describe('validateForm() tests', () => {
  test('1️ - Missing required fields returns errors for all', () => {
    const data = { fname: '', lname: '', username: '', email: '', password: '' };
    const result = validateSignupForm(data);

    expect(result).toEqual({
      fname: 'This field is required',
      lname: 'This field is required',
      username: 'This field is required',
      email: 'This field is required',
      password: 'This field is required',
    });
  });

  test('2️ - Invalid email format returns only email error', () => {
    const data = {
      fname: 'John',
      lname: 'Smith',
      username: 'john123',
      email: 'invalidemail@',
      password: 'ValidPass1',
    };
    const result = validateSignupForm(data);

    expect(result).toEqual({
      email: 'Please enter a valid email address',
    });
  });

  test('3️ - Weak password returns password error', () => {
    const data = {
      fname: 'John',
      lname: 'Smith',
      username: 'john123',
      email: 'john@mail.com',
      password: 'abc',
    };
    const result = validateSignupForm(data);

    expect(result).toEqual({
      password: 'Password needs at least 8 characters.',
    });
  });

  test('4️ - Password missing uppercase returns specific error', () => {
    const data = {
      fname: 'John',
      lname: 'Smith',
      username: 'john123',
      email: 'john@mail.com',
      password: 'lowercase8',
    };
    const result = validateSignupForm(data);

    expect(result).toEqual({
      password: 'Password needs an uppercase letter',
    });
  });

  test('5 - Short username returns username error', () => {
    const data = {
      fname: 'John',
      lname: 'Smith',
      username: 'john',
      email: 'john@mail.com',
      password: 'ValidPass1',
    };
    const result = validateSignupForm(data);

    expect(result).toEqual({
      username: 'Username needs a minimum of 6 characters',
    });
  });
});
