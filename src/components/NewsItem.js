import React, { Component } from "react";


export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author,date,source } = this.props;
    return (
      <div>
        <div  className="card my-3" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%" ,zIndex:"1"}}>
        {source}
    <span className="visually-hidden">unread messages</span>
  </span>
          <img src={imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" } className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author :"unknown"} on {date}</small></p>
            <a
              href={newsUrl }
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
