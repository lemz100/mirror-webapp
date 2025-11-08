import { validateSignupForm, isMinimum, hasNumbers, hasUppercase } from './utils/validation';
import { useSignupFormReducer } from './utils/signupReducer';
import Input from '@/components/Input/Input';
import styles from './Authentication.module.less';
import Button from '../../components/Button/Button';
import PasswordValid from '../../components/SignupPword/Input'; // Password w/ validation box - testing
import axios from 'axios';
import Toaster from '../../components/Toaster/Toaster';

function Signup() {
  /** State variables */
  const { state, dispatch } = useSignupFormReducer(); // Custom form reducer with initial state for form and dispatch function for changing state.
  let { formData, formErrors, message, validations, loading } = state;
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        name: name,
        value: value,
      },
    });

    if (name === 'password') {
      dispatch({
        type: 'SET_VALIDATION',
        payload: {
          name: 'minLength',
          isValid: isMinimum(value, 8),
        },
      });
      dispatch({
        type: 'SET_VALIDATION',
        payload: {
          name: 'hasUppercase',
          isValid: hasUppercase(value),
        },
      });
      dispatch({
        type: 'SET_VALIDATION',
        payload: {
          name: 'hasNumber',
          isValid: hasNumbers(value),
        },
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
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

        dispatch({
          type: 'SET_MESSAGE',
          payload: {
            problem: false,
            message: res.data.message,
          },
        });
        // Resets form when submission is correct
        if (res.status === 201) {
          dispatch({ type: 'RESET_FORM' });
        }
      } catch (err) {
        if (err.response) {
          const taken = err.response?.data?.taken; // Gets the object from backend

          // If a field is taken, it will clear it and apply the error message.
          if (taken?.email) {
            dispatch({
              type: 'UPDATE_FIELD',
              payload: {
                name: 'email',
                value: '',
              },
            });
            dispatch({
              type: 'SET_ERROR',
              payload: {
                name: 'email',
                value: 'Email is taken. Please enter a different one',
              },
            });
          }
          if (taken?.username) {
            dispatch({
              type: 'UPDATE_FIELD',
              payload: {
                name: 'username',
                value: '',
              },
            });
            dispatch({
              type: 'SET_ERROR',
              payload: {
                name: 'username',
                value: 'Username is taken. Please enter a different one',
              },
            });
          }
          dispatch({
            type: 'SET_MESSAGE',
            payload: {
              problem: true,
              message: 'You have some invalid fields - please review your entries',
            },
          });
        } else {
          dispatch({
            type: 'SET_MESSAGE',
            payload: {
              problem: true,
              message: 'Something went wrong',
            },
          });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
        setTimeout(() => {
          dispatch({ type: 'SET_MESSAGE', payload: { problem: false, message: '' } });
        }, 3000); // 3000ms = 3s
      }
    } else {
      // Turn this into reducer
      dispatch({
        type: 'SET_ERROR',
        payload: {
          value: errors,
        },
      });
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });
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
