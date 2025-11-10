import classes from '../styles/FilterForm.module.css';
export function FilterForm({children, onSubmit}) {
  return (
    <form className={classes.filterForm} onSubmit={onSubmit}>
      {children}
    </form>
  );
}