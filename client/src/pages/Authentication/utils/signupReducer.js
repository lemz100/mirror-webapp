import { useReducer } from 'react';

/**
 * Planning to switch from multiple useState's to useReducers
 * Centralized, better managed way of managing state.
 * SEE DISPATCH EXAMPLES FOR HOW TO USE.
 *
 */

const initialState = {
  formData: {
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  },
  formErrors: {
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  },
  message: {
    problem: false,
    message: '',
  },
  validations: {
    minLength: { label: 'Minimum 8 Characters', isValid: false },
    hasUppercase: { label: 'Has an uppercase letter', isValid: false },
    hasNumber: { label: 'Has a number', isValid: false },
  },
  loading: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.name]: action.payload.value },
      };
    case 'SET_ERROR':
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_VALIDATION':
      return {
        ...state,
        validations: {
          ...state.validations,
          [action.payload.name]: {
            ...state.validations[action.payload.name],
            isValid: action.payload.isValid,
          },
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: {
          problem: action.payload.problem,
          message: action.payload.message,
        },
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: {
          fname: '',
          lname: '',
          username: '',
          email: '',
          password: '',
        },
        formErrors: {
          fname: '',
          lname: '',
          username: '',
          email: '',
          password: '',
        },
        validations: {
          minLength: { label: 'Minimum 8 Characters', isValid: false },
          hasUppercase: { label: 'Has an uppercase letter', isValid: false },
          hasNumber: { label: 'Has a number', isValid: false },
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          ...action.payload.value,
        },
      };
    case 'UPDATE_FIELDS':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload.value,
        },
      };
    default:
      return state;
  }
}

// Custom hook
export function useSignupFormReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return { state, dispatch };
}

/** DISPATCH examples 
// 1️⃣ User types into the first name field
dispatch({
  type: 'UPDATE_FIELD',
  payload: { name: 'fname', value: 'Lemuel' },
});

// 2️⃣ User types into email field
dispatch({
  type: 'UPDATE_FIELD',
  payload: { name: 'email', value: 'lemz@example.com' },
});

// 3️⃣ Validation fails (empty last name)
dispatch({
  type: 'SET_ERROR',
  payload: { name: 'lname', error: 'Last name is required.' },
});

// 4️⃣ Password validation updates
dispatch({
  type: 'SET_VALIDATION',
  payload: { name: 'minLength', isValid: true },
});
dispatch({
  type: 'SET_VALIDATION',
  payload: { name: 'hasUppercase', isValid: false },
});

// 5️⃣ Loading state toggles (e.g. during API call)
dispatch({ type: 'SET_LOADING', payload: true });

// 6️⃣ Success message
dispatch({
  type: 'SET_MESSAGE',
  payload: { problem: false, message: 'Signup successful!' },
});

// 7️⃣ Reset entire form
dispatch({ type: 'RESET_FORM' });
*/
