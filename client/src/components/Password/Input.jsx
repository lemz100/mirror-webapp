import styles from './Input.module.less';
import ErrorMsg from './ErrorMsg/ErrorMsg';

function Password({ errorText, onChange, value, placeholder }) {
  /**
   * label = desired label for the textfield
   * optional = for required or not required fields.
   * error = boolean value for whether there is an error or not
   * errorText = customized text for the error message that appears below.
   */

  return (
    <label className={styles.textLabel} htmlFor="password">
      <span>
        <p className={styles.text}>Password</p>
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
    </label>
  );
}

export default Password;
