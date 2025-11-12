import styles from '../styles/InputBox.module.css';

export function Dropdown({ label, values = [], value, setValue }) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={`${label}-Dropdown`}>{label}:</label>
      <select name="status" id={`${label}-Dropdown`} value={value} onChange={(e) => setValue(e.target.value)}>
        {values.map((value) => {
          const displayValue = capitalizeFirstLetter(value);
          return <option key={value} value={value}>{displayValue}</option>
        })}
      </select>
    </div>
  )
}


function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}