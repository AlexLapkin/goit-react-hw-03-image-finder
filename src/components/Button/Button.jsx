import css from './Button.module.css';
import PropTypes from 'prop-types'; 

const Button = ({onClickLoadMore}) => {
   return (
    <button onClick={onClickLoadMore}>Load more</button>
   )
}

export default Button;