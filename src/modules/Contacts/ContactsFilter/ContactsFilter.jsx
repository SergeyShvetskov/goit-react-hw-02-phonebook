import PropTypes from 'prop-types';

import styles from '../contacts.module.css';

const ContactsFilter = ({ handleChange }) => {
  return (
    <div className={styles.formGroup}>
      <label>Find contacts by name</label>
      <input name="filter" onChange={handleChange} placeholder="" />
    </div>
  );
};

export default ContactsFilter;

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
