import React, { Component } from 'react';

export default class NewsItem extends Component {
    formatDate = (dateStr) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateStr).toLocaleString('en-IN', options);
    }

    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card shadow position-relative" style={{ height: '520px' }}>
                    {/* Image Container */}
                    <div className="img-container position-relative" style={{ height: '180px' }}>
                        <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
                            style={{ transform: 'translate(0, -100%)', zIndex: '1', fontSize: '0.85rem' }}>
                            {source}
                        </span>
                        <img
                            className="card-img-top"
                            src={imgUrl || "https://via.placeholder.com/150"}
                            alt="news"
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* Card Body */}
                    <div className="card-body d-flex flex-column" style={{ height: '340px' }}>
                        <h5 className="card-title" style={{
                            height: 'auto',
                            maxHeight: '85px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                            marginBottom: '12px',
                            fontSize: '1.1rem',
                            lineHeight: '1.5'
                        }}>
                            {title}
                        </h5>
                        
                        <p className="card-text" style={{
                            height: 'auto',
                            maxHeight: '120px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '4',
                            WebkitBoxOrient: 'vertical',
                            marginBottom: '12px',
                            fontSize: '0.95rem',
                            lineHeight: '1.5'
                        }}>
                            {description}
                        </p>
                        
                        <div className="mt-auto">
                            <p className="card-text mb-2">
                                <small className="text-body-secondary" style={{
                                    color: '#6c757d',
                                    fontSize: '0.85rem',
                                    fontWeight: '300'
                                }}>
                                    By {!author ? "Unknown" : author} on {this.formatDate(date)}
                                </small>
                            </p>
                            <a href={newsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-dark">
                                Read more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
