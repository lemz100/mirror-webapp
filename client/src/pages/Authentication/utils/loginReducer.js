import { useReducer } from 'react';

const initialState = {
  formData: {
    username: '',
    password: '',
  },
  formErrors: {
    username: '',
    password: '',
  },
  message: {
    problem: false,
    message: '',
  },
  loading: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: {
          username: '',
          password: '',
        },
        formErrors: {
          username: '',
          password: '',
        },
      };
    case 'RESET_AFTER_LOGIN':
      return {
        ...state,
        formData: {
          username: '',
          password: '',
        },
        formErrors: {
          username: '',
          password: '',
        },
        loading: action.payload,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          ...action.payload.value,
        },
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: {
          problem: action.payload.problem,
          message: action.payload.message,
        },
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.name]: action.payload.value },
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
export function useLoginFormReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return { state, dispatch };
}
