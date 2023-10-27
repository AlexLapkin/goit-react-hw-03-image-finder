import React, { Component } from "react";

class Searchbar extends Component {
state = {
  searchWord: '',  
}
  
  handleSubmit = event => {
    event.preventDefault();
    this.props.fetchGallery(this.state.searchWord);
    this.setState({
      searchWord: '',
    })
  }

 handleInputChange = event => {
  this.setState({ searchWord: event.currentTarget.value});
 }

  render() {
    //const { searchWord } = this.state.
    return (
        <header class="searchbar">
        <form class="form"
        onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>
      
          <input
            name = "searchWord"
            value={this.state.searchWord}
            //value={searchWord}
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header> 
    )
}
}

export default Searchbar;