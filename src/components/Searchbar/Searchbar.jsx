import React, { Component } from "react";
import css from './Searchbar.module.css';
import PropTypes from "prop-types";
class Searchbar extends Component {
state = {
  searchWord: '',  
}
  
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchWord);
    //this.setState({
    //  searchWord: '',
    //})
  }

 handleInputChange = event => {
  this.setState({ searchWord: event.currentTarget.value});
 }

  render() {
    //const { searchWord } = this.state;
    return (
        <header className={css.searchbar}>
        <form className={css.searchbar_form}
        onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchbar_btn}>
            <span className={css.button_label}>Search</span>
          </button>
          <input
            name = "searchWord"
            value={this.state.searchWord}
            //value={searchWord}
            className={css.searchbar_input}
            type="text"
            //autocomplete="off"
            //autofocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header> 
    )
}
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  searchWord: PropTypes.string,
}

export default Searchbar;