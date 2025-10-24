import { useState } from 'react';
import { validateLoginForm } from './utils/validation';
import styles from './Authentication.module.less';
import axios from 'axios';
import Input from '@/components/Input/Input';
import Button from '../../components/Button/Button';
import Password from '../../components/Password/Input';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length === 0) {
      const { username, password } = formData;
      try {
        // sends axios post request to the server to process login
        const res = await axios.post('http://localhost:8080/login', {
          username,
          password,
        });

        setMessage(`Welcome back ${res.data.user.username}!`);
      } catch (err) {
        if (err.response) {
          setMessage(err.response.data.message || 'Login failed');
        } else {
          setMessage('Something went wrong');
        }
      }
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
    <section className={styles.login}>
      <h1>Log in to your account</h1>
      <form action="#" noValidate onSubmit={handleSubmit}>
        <Input
          id={'username'}
          name={'username'}
          label={'Username/Email'}
          value={formData.username}
          optional={false}
          onChange={handleChange}
          errorText={formErrors.username}
        />
        <Password
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          errorText={formErrors.password}
        />
        <Button text={'Log in'} />
      </form>
      <p>{message}</p>
    </section>
  );
}

export default Login;
