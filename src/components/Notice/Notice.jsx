import styles from './Notice.module.css'

export default function Notice({ type, children }) {
  return <div className={`${styles.notice} ${styles[type]}`}>{children}</div>
}