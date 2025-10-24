import { useState } from 'react';
import { validateSignupForm } from './utils/validation';
import Input from '@/components/Input/Input';
import styles from './Authentication.module.less';
import Button from '../../components/Button/Button';
import Password from '../../components/Password/Input';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateSignupForm(formData); /** Checks if form is validated */
    if (Object.keys(errors).length === 0) {
      const { fname, lname, username, email, password } = formData;
      try {
        // Async function - sends axios post to the server to process signup in the backend
        const res = await axios.post('http://localhost:8080/signup', {
          fname,
          lname,
          username,
          email,
          password,
        });

        setMessage(res.data.message);
      } catch (err) {
        if (err.response) {
          setMessage(err.response.data.message || 'Registration failed');
        } else {
          setMessage('Something went wrong');
        }
      }
      /** Form + error resets */
      setFormData({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
      });
      setFormErrors({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
      });
    } else {
      setFormErrors(errors);
    }
  }

  return (
    <section className={styles.signup}>
      <h1>Sign up below</h1>
      <form action="#" noValidate onSubmit={handleSubmit}>
        <Input
          id={'username'}
          name={'username'}
          label={'Username'}
          value={formData.username}
          optional={false}
          onChange={handleChange}
          errorText={formErrors.username}
        />
        <Input
          id={'fname'}
          name={'fname'}
          label={'First Name'}
          value={formData.fname}
          optional={false}
          onChange={handleChange}
          errorText={formErrors.fname}
        />
        <Input
          id={'lname'}
          name={'lname'}
          label={'Last Name'}
          value={formData.lname}
          optional={false}
          onChange={handleChange}
          errorText={formErrors.lname}
        />
        <Input
          id={'emailAddr'}
          name={'email'}
          label={'Email address'}
          value={formData.email}
          optional={false}
          onChange={handleChange}
          errorText={formErrors.email}
        />
        <Password
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          errorText={formErrors.password}
        />
        <Button text={'Sign up'} />
      </form>
      <p>{message}</p>
    </section>
  );
}

export default Signup;
