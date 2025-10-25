import styles from './ErrorMsg.module.less';

function ErrorMsg({ text }) {
  return <p className={`${styles.errorMsg} ${text ? styles.visible : ''}`}>{text}</p>;
}

export default ErrorMsg;
