import React from 'react';
import PropTypes from 'prop-types';
import s from './Section.module.css'
import Container from '../Container';

const Section = ({children, title}) => {
  return (
    <div className={s.container}>
      <Container className={s.style}>
        <h3 className='s.header'>{title}</h3>
        {children}
      </Container>
    </div>
  );
};

Container.propTypes = {
  title: PropTypes.string
};

export default Section;
