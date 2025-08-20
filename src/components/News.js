import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 20,
      totalResults: 0,
      maxPages: 15,
    };
  }

  // 🔥 Core function to fetch news
  async updateNews() {
    try {
      this.setState({ loading: true });

      const { country, category } = this.props;
      const { page, pageSize } = this.state;

      // Call your own API route
      let url = `/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status !== "ok") {
        throw new Error(parsedData.message || "No news found from API");
      }

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ articles: [], loading: false });
    }
  }

  async componentDidMount() {
    await this.updateNews();
  }

  fetchMoreData = async () => {
    const { articles, totalResults, page, pageSize } = this.state;
    if (articles.length >= totalResults) return;

    const nextPage = page + 1;
    const { country, category } = this.props;

    try {
      let url = `/api/news?country=${country}&category=${category}&page=${nextPage}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status !== "ok") {
        throw new Error(parsedData.message || "No news found from API");
      }

      this.setState({
        articles: articles.concat(parsedData.articles || []),
        page: nextPage,
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error in fetchMoreData:", error);
      this.setState({ loading: false });
    }
  };

  getHeading = () => {
    const { category } = this.props;
    switch (category) {
      case "health":
        return "Health BYTES";
      case "sports":
        return "Sports BYTES";
      case "entertainment":
        return "Entertainment BYTES";
      case "technology":
        return "Technology BYTES";
      case "business":
        return "Business BYTES";
      case "science":
        return "Science BYTES";
      case "general":
      default:
        return "QUICK NEWS BYTES";
    }
  };

  render() {
    const { articles, totalResults, pageSize, maxPages } = this.state;
    const maxArticles = Math.min(totalResults, pageSize * maxPages);
    const hasMore = articles.length < maxArticles;

    return (
      <div className="container my-3">
        <h3>
          <b>NewsSpidey - {this.getHeading()}</b>
        </h3>
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all 🎉</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-3" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
