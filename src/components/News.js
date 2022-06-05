import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinnner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps ={
        country : "in",
        pageSize: 15,
        category:'general',



    }

    static propTypes ={
        country  : PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string,

    }
    //capitalize only the first letter of the string. 
    capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    
    constructor(props){
        super(props); 
        this.state={
            articles : [],
            loading : false ,
            totalResults: 0

        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-News-App`;
    }
    async UpdateNews(){
        console.log("Component Did mount")
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=977fcace817f451dbd7a7ad916993974&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : this.state.articles.concat(parsedData.articles),
        totalResults : parsedData.totalResults,
        loading : false,
        page :1,
        totalResults : 0
 
    })
    const fetchMoreData = async () =>{
        this.setState({page: this.state.page + 1})

    }

    }
    async componentDidMount(){
        console.log("Component Did mount")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=977fcace817f451dbd7a7ad916993974&pageSize=${this.state.pageSize}&page=${this.state.page}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles})
    }
    handlePreviousClick =  ()=>{
        console.log("previous");
        this.setState({page:this.state.page - 1})
        this.UpdateNews();
        
    }
    handleNextClick =  ()=>{
        console.log("next");
        this.setState({page:this.state.page + 1})
        this.UpdateNews();
    }
    
  fetchMoreData = async () => {
    this.setState({page : this.state.page+1})
    console.log("Component Did mount")
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=977fcace817f451dbd7a7ad916993974&pageSize=${this.props.pageSize}`

    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);


  };

  render() {
    return (
        <>
    <div className="container my-6 ">
        <h1 className="text-center">News App -Top Headlines-{this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading && <Spinnner  />} */}


        <div className="row">
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
            <div className="container">
            <div className="row">

        {this.state.articles.map((element)=>{
        return  <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title  } description={element.description} imageUrl ={element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" }
        newsUrl ={element.url} author={element.author} date={element.publishedAt} source ={element.source.name} />

        </div>

    })}
    </div>
    </div>

        </InfiniteScroll>
        </div>


    </div>

    </>
    )
  }
}
