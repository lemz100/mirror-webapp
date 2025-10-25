import styles from './Required.module.less';

function Required({ optional }) {
  return <p className={styles.required}>{optional == false ? '*' : 'optional'}</p>;
}

export default Required;
