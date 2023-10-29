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
    searchWord: '',
    page: 1,
    per_page: 12,
    isOpenModal: false,
    largeImageURL: 'largeImageURL',
    onLoadMore: false,
    id: null,
    error: null,
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
     const { per_page } = this.state; 
               
     if ((data.hits).length !== 0 && page === 1) {
     Notiflix.Notify.success(`We found ${totalHits} images for your request`,
     {position: 'right-top', timeout: 3000 })
     }
     if ((data.hits).length === 0) {
     Notiflix.Notify.failure('Nothing found for your request! Please enter another word!',
      { position: 'center-center',
      timeout: 3000,
    })
      this.setState({
       searchWord: '',
      })
    }

    this.setState(prevState => ({
      gallery: (page === 1) ? data.hits : [...prevState.gallery, ...data.hits],
      isLoading: false,
      onLoadMore: (totalHits > per_page * page) ? true : false,
    })
 )
      if (totalHits <= per_page * page && totalHits) {
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results!',
      { position: 'right-top',
      timeout: 5000,
    })
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
     page: prevState.searchWord !== searchWord ? 1 : prevState.page,
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
      
      {isLoading && < Loader  />
      }
      
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