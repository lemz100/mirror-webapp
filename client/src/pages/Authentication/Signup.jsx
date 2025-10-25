import { useState } from 'react';
import { validateSignupForm, isMinimum, hasNumbers, hasUppercase } from './utils/validation';
import Input from '@/components/Input/Input';
import styles from './Authentication.module.less';
import Button from '../../components/Button/Button';
import PasswordValid from '../../components/SignupPword/Input'; // Password w/ validation box - testing
import axios from 'axios';
import Toaster from '../../components/Toaster/Toaster';

function Signup() {
  /** State variables */
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
  const [message, setMessage] = useState({
    problem: false,
    message: '',
  });
  const [validations, setValidations] = useState({
    minLength: {
      label: 'Minimum 8 Characters',
      isValid: false,
    },
    hasUppercase: {
      label: 'Has an uppercase letter',
      isValid: false,
    },
    hasNumber: {
      label: 'Has a number',
      isValid: false,
    },
  });
  const [loading, setLoading] = useState(false);

  /** Reset variables for resetting states */
  const resetValidations = {
    minLength: { label: 'Minimum 8 Characters', isValid: false },
    hasUppercase: { label: 'Has an uppercase letter', isValid: false },
    hasNumber: { label: 'Has a number', isValid: false },
  };
  const reset = {
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  };
  const resetMessage = {
    problem: false,
    message: '',
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      const checks = {
        minLength: isMinimum(value, 8),
        hasUppercase: hasUppercase(value),
        hasNumber: hasNumbers(value),
      };

      setValidations((prev) => {
        const updated = { ...prev };
        for (const key in checks) {
          updated[key] = { ...updated[key], isValid: checks[key] };
        }
        return updated;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
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

        setMessage({ problem: false, message: res.data.message });
        // Resets form when submission is correct
        if (res.status === 201) {
          setFormData(reset);
          setFormErrors(reset);
          setValidations(resetValidations);
        }
      } catch (err) {
        if (err.response) {
          const taken = err.response?.data?.taken; // Gets the object from backend

          const newFormData = { ...formData };
          const newFormErrors = { ...formErrors };
          // If a field is taken, it will clear it and apply the error message.
          if (taken?.email) {
            newFormData.email = '';
            newFormErrors.email = 'Email is taken. Please enter a different one';
          }
          if (taken?.username) {
            newFormData.username = '';
            newFormErrors.username = 'Username is taken. Please enter a different one';
          }

          setFormData(newFormData);
          setFormErrors(newFormErrors);

          setMessage({
            problem: true,
            message: 'You have some invalid fields - please review your entries',
          });
        } else {
          setMessage({ problem: true, message: 'Something went wrong' });
        }
      } finally {
        setLoading(false);
        setTimeout(() => {
          setMessage(resetMessage); // resets after 3 seconds
        }, 3000); // 3000ms = 3s
      }
    } else {
      setFormErrors(errors);
    }
  }

  return (
    <section className={styles.signup}>
      <div
        className={`${styles.toasterCont} ${message.message.length !== 0 ? styles.visible : ''}`}
      >
        <Toaster problem={message.problem} message={message.message} />
      </div>
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
        <PasswordValid
          validations={validations}
          optional={false}
          onChange={(e) => handleChange(e)}
          value={formData.password}
          placeholder={'Enter your password'}
          errorText={formErrors.password}
        />
        <Button text={'Sign up'} loading={loading} />
      </form>
    </section>
  );
}

export default Signup;
