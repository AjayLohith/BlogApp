import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
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

  async updateNews() {
    try {
      this.setState({ loading: true });

      const { country, category } = this.props;
      const { page, pageSize, maxPages } = this.state;
      const maxArticles = pageSize * maxPages;

      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=16f6c3a11423473aa1e4186778fd3d6c&page=${page}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === "error") {
        throw new Error(parsedData.message);
      }

      const limitedTotal = Math.min(parsedData.totalResults, maxArticles);

      this.setState({
        articles: parsedData.articles || [],
        totalResults: limitedTotal,
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

  handleNxtClick = async () => {
    if (this.state.page < this.state.maxPages) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1, loading: true }),
        async () => {
          await this.updateNews();
        }
      );
    }
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({ page: prevState.page - 1, loading: true }),
        async () => {
          await this.updateNews();
        }
      );
    }
  };

  fetchMoreData = async () => {
    const { articles, totalResults, page, pageSize, maxPages } = this.state;
    const maxArticles = Math.min(totalResults, pageSize * maxPages);

    if (articles.length >= maxArticles) return;

    const nextPage = page + 1;
    const { country, category } = this.props;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === "error") {
        throw new Error(parsedData.message);
      }

      const newTotal = Math.min(parsedData.totalResults, pageSize * maxPages);

      this.setState({
        articles: articles.concat(parsedData.articles || []),
        page: nextPage,
        totalResults: newTotal,
        loading: false,
      });
    } catch (error) {
      console.error("Error in fetchMoreData:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { articles, totalResults, pageSize, maxPages } = this.state;
    const maxArticles = Math.min(totalResults, pageSize * maxPages);
    const hasMore = articles.length < maxArticles;

    return (
      <div className="container my-3">
        <h3>
          <b>NewsSpidey - QUICK NEWS BYTES</b>
        </h3>

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={null} // ✅ Prevent spinner flicker
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all 🎉</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12 my-3"
                  key={element.url}
                >
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
