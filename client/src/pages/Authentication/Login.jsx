import { useState } from 'react';
import { validateLoginForm } from './utils/validation';
import styles from './Authentication.module.less';
import axios from 'axios';
import Input from '@/components/Input/Input';
import Toaster from '../../components/Toaster/Toaster';
import Button from '../../components/Button/Button';
import Password from '../../components/Password/Input';

function Login() {
  /** State variables */
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState({
    problem: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  /** Reset variables - for resetting states */
  const reset = {
    username: '',
    password: '',
  };
  const resetMessage = {
    problem: false,
    message: '',
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length === 0) {
      const { username, password } = formData;
      try {
        // sends axios post request to the server to process login
        const res = await axios.post('http://localhost:8080/login', {
          username,
          password,
        });

        setMessage({ problem: false, message: `Welcome back ${res.data.user.username}!` });
      } catch (err) {
        if (err.response) {
          setMessage({ problem: true, message: err.response.data.message || 'Login failed' });
        } else {
          setMessage({ problem: true, message: 'Something went wrong' });
        }
      } finally {
        setFormData(reset);
        setFormErrors(reset);
        setLoading(false);
        setTimeout(() => {
          setMessage(resetMessage); // resets after 3 seconds
        }, 3000); // 3000ms = 3s
      }
    } else {
      setFormErrors(errors);
      setLoading(false);
    }
  }

  return (
    <section className={styles.login}>
      <div
        className={`${styles.toasterCont} ${message.message.length !== 0 ? styles.visible : ''}`}
      >
        <Toaster problem={message.problem} message={message.message} />
      </div>
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
        <Button text={'Log in'} loading={loading} />
      </form>
    </section>
  );
}

export default Login;
