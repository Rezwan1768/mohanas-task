import styles from '../styles/InputBox.module.css';

export function SearchBox({ searchTerm, setSearchTerm, label = "Label" }) {
  return(
    <div className={styles.inputBox}>
      <label htmlFor={`${label}-search`}>{label}:</label>
      <input
        id={`${label}-search`}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}