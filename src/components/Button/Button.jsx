import css from './Button.module.css';
import PropTypes from 'prop-types'; 

const Button = ({ onClickLoadMore }) => {
   return (
     <button className={css.button}
     onClick={onClickLoadMore}>Load more</button>
     )
}

Button.propTypes = {
  onClickLoadMore: PropTypes.func,
}

export default Button;