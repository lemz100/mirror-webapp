import styles from './Button.module.less';

/**
 * For buttons that have two different styles but the same core button style, this component is good for this.
 */

function Button({ text }) {
  /** If type doesnt = primary, then check if it equals secondary, then its either that or null. */
  return <button className={styles.button}>{text}</button>;
}

export default Button;
