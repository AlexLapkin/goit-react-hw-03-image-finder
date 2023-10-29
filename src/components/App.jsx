import React, {Component} from "react";
import Modal  from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery  from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import fetchImage from "./FetchImage/FetchImage";
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    gallery: null,
    isLoading: false,
    error: null,
    searchWord: '',
    page: 1,
    totalImages: 0,
    per_page: 12,
    isOpenModal: false,
    largeImageURL: 'largeImageURL',
    onLoadMore: false,
    id: null,
  }

    fetchGallery = async (searchWord, page) => {
      this.setState({
        isLoading: true,
      });

      if (!searchWord) {
        this.setState({
          isLoading: false,
        })
        return;
      }
     try {
     const { data } = await fetchImage(searchWord, page);
     const {totalHits} = data;
               
     if ((data.hits).length === 0) {
      Notiflix.Notify.info('Nothing found for your request! Please enter another word!',
      { position: 'center-center',
      timeout: 3000,
    })
      this.setState({
       searchWord: '',
      })
    }

     if (page === 1 ) {
      this.setState({
       gallery: data.hits,
       isLoading: false,
       onLoadMore: (totalHits > 12 * page) ? true : false
       });
      }
        else {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...data.hits],
          isLoading: false,
          onLoadMore: (totalHits > 12 * page) ? true : false
        }))
    }
}
      catch (error) {
        this.setState({error: error.message});
      } finally {
        this.setState({
          isLoading: false,
        })
      }
    }
  
onClickLoadMore = () => {
  this.setState(prevState => ({
   page: prevState.page + 1,
  }))
}

openModal = (largeImageURL) => {
  this.setState({
    isOpenModal: true,
    largeImageURL: largeImageURL,
  })
 }

closeModal = () => {
  this.setState({
isOpenModal: false,
largeImageURL: null,
})
}

formSubmit = searchWord => {
  if (!searchWord) {
   Notiflix.Notify.info('Please enter any word for search!',
      { position: 'right-top',
      timeout: 3000,
    })
   return;
  }
 this.setState(prevState => ({
     gallery: prevState.searchWord === searchWord ? prevState.gallery : null,
     searchWord,
     page: 1,
   }));
}

  componentDidUpdate(_, prevState) {
    const {searchWord, page} = this.state;
    
      if (prevState.searchWord !== searchWord || prevState.page !== page) {
      this.fetchGallery(searchWord, page);
  }
}

    render() {
    const {gallery, largeImageURL, isOpenModal, onLoadMore, isLoading } = this.state;
    
    return (
      <div>
      < Searchbar onSubmit={this.formSubmit} />

      < ImageGallery gallery={gallery}
       openModal={this.openModal} />

      {isLoading && < Loader  />}

      { gallery && onLoadMore && (!isLoading) &&
      < Button onClickLoadMore={this.onClickLoadMore}/>
      }
      
      { isOpenModal &&
      < Modal closeModal={this.closeModal}
        largeImageURL={largeImageURL} />
        }
      </div>
    )}
  }