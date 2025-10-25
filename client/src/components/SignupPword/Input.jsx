import styles from './Input.module.less';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import Required from './Required/Required';
import Issue from '../Icons/Issue';
import Tick from '../Icons/Tick';

function Password({ validations, errorText, optional, onChange, value, placeholder }) {
  /**
   * Validations - state object that has 1) validation label and 2) boolean variable to check if validation checks are passed.
   * optional = for required or not required fields.
   */

  return (
    <label className={styles.textLabel} htmlFor="password">
      <span className={styles.text}>
        <p>Password</p>
        <Required optional={optional} />
      </span>
      <input
        className={`${styles.textfield} ${errorText ? styles.error : ''}`}
        type="password"
        name="password"
        autoComplete="off"
        id="password" /** corresponding id for the input */
        value={value} /** value of input - usually state-managed */
        onChange={onChange} /** State-updating function when the value changes */
        placeholder={placeholder}
      />
      <ErrorMsg text={errorText} />
      <article className={styles.validation}>
        <span>
          {!validations.minLength.isValid ? (
            <Issue fill={'#a30000ff'} />
          ) : (
            <Tick fill={'#23742eff'} />
          )}
          <p>{validations.minLength.label}</p>
        </span>
        <span>
          {!validations.hasUppercase.isValid ? (
            <Issue fill={'#a30000ff'} />
          ) : (
            <Tick fill={'#23742eff'} />
          )}
          <p>{validations.hasUppercase.label}</p>
        </span>
        <span>
          {!validations.hasNumber.isValid ? (
            <Issue fill={'#a30000ff'} />
          ) : (
            <Tick fill={'#23742eff'} />
          )}
          <p>{validations.hasNumber.label}</p>
        </span>
      </article>
    </label>
  );
}

export default Password;
