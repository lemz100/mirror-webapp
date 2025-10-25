import styles from './Toaster.module.less';
import SuccessIcon from '../Icons/Tick';
import FailureIcon from '../Icons/Issue';

function Toaster({ problem, message }) {
  return (
    <div className={`${styles.toaster} ${problem ? styles.problem : styles.success}`}>
      <span className={styles.cont}>
        {problem ? <FailureIcon fill={'#d4d4d7ff'} /> : <SuccessIcon fill={'#d4d4d7ff'} />}
        <p className={styles.desc}>{message}</p>
      </span>
    </div>
  );
}

export default Toaster;
