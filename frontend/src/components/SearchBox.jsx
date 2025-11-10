import styles from '../styles/InputBox.module.css';

export function SearchBox({ value, setValue, label = "Label" }) {
  return(
    <div className={styles.inputBox}>
      <label htmlFor={`${label}-search`}>{label}:</label>
      <input
        id={`${label}-search`}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}