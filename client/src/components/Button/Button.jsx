import styles from './Button.module.less';

/**
 * Adds loading prop = set by default to false if not needed. - Used for loading
 * Adds disabled prop = set by default to false if not needed. - Used for turning off button while loading
 * Adjust 'loading' prop to configure button loading properly = to true.
 */

function Button({ text, loading = false, disabled = false }) {
  return (
    <button className={styles.button} disabled={loading || disabled}>
      {loading ? <span className={styles.loader}></span> : text}
    </button>
  );
}

export default Button;
