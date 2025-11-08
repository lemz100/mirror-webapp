import { useLoginFormReducer } from './utils/loginReducer';
import { validateLoginForm } from './utils/validation';
import styles from './Authentication.module.less';
import axios from 'axios';
import Input from '@/components/Input/Input';
import Toaster from '../../components/Toaster/Toaster';
import Button from '../../components/Button/Button';
import Password from '../../components/Password/Input';

function Login() {
  const { state, dispatch } = useLoginFormReducer(); // Custom form reducer with initial state for form and dispatch function for changing state.
  let { formData, formErrors, message, loading } = state;

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        name: name,
        value: value,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length === 0) {
      const { username, password } = formData;
      try {
        // sends axios post request to the server to process login
        const res = await axios.post('http://localhost:8080/login', {
          username,
          password,
        });

        dispatch({
          type: 'SET_MESSAGE',
          payload: {
            problem: false,
            message: `Welcome back ${res.data.user.username}!`,
          },
        });
      } catch (err) {
        if (err.response) {
          dispatch({
            type: 'SET_MESSAGE',
            payload: {
              problem: true,
              message: err.response.data.message || 'Login failed',
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
        dispatch({
          type: 'RESET_AFTER_LOGIN',
          payload: false,
        });
        setTimeout(() => {
          dispatch({ type: 'SET_MESSAGE', payload: { problem: false, message: '' } });
        }, 3000); // 3000ms = 3s
      }
    } else {
      // Turn this into reducer
      dispatch({
        type: 'SET_ERRORS',
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
