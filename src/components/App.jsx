import React, {Component} from "react";
import Modal  from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
//import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import ImageGallery  from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
//import Loader from "./Loader/Loader";
import fetchImage from "./FetchImage/FetchImage";


export class App extends Component {
  state = {
    gallery: null,
    isLoading: false,
    error: null,
    searchWord: '',
    page: 1,
    totalImages: 0,
    per_page: 12,
  }

  fetchGallery = async (searchWord) => {
    try {
      this.setState({
        isLoading: true,
      });
      
     const {data} = await fetchImage(searchWord);
     //const { id, webformatURL, largeImageURL } = data.hits;
     //console.log(data.hits)
      
      this.setState({
       gallery: data.hits,
      });
    }
      catch (error) {
        this.setState({error: error.message});
      } finally {
        this.setState({
          isLoading: false,
        })
      }
    }
  

  onClickLoadMore = async () => {
  const {page, per_page, totalImages, searchWord} = this.state;
  console.log(page)
  console.log(per_page)
 // page += 1;
  //totalImages = per_page * page;
  //console.log(totalImages)
  
  
  try {
    const {data} = await fetchImage(searchWord);
    const {totalHits} = data;
    //console.log(111)
    console.log(totalHits)
    }
    catch (error) {(console.log(error))}
}

  //componentDidMount() {
    //this.searchImage();
    //this.fetchGallery();
    //this.handleSubmit()
  //}

   componentDidUpdate(_, prevState) {
    const {searchWord, totalImages} = this.state;
    
    console.log(searchWord)
    
    if (prevState.searchWord !== searchWord) {
      this.fetchGallery(searchWord);
    }
    //if (totalImages >= totalHits) {
      this.onClickLoadMore();
    //}
  }

   // Рендер разметки компонента
  render() {
    return (
      <div>
      < Searchbar fetchGallery={this.fetchGallery}
      
       />
     < ImageGallery gallery={this.state.gallery}/>
      < Button onClickLoadMore={this.onClickLoadMore}/>
      < Modal />
      </div>
    )
    }
  }
