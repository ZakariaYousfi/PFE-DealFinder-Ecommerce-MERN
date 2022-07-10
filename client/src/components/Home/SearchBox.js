import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Article from '../Post/Article';

const SearchBox = ({ placeholder, setSearchValue }) => {

    const posts = useSelector((state) => state.postReducer);
    const [wordEnterd, setWordEnterd] = useState("");
    const [searchButton, setSearchButton] = useState("Search");
    const [clear, setClear] = useState(false);
    const [showArticleSearch, setShowArticleSearch] = useState("");

    const handleSearch = (event) => {
        setWordEnterd(event.target.value);
    }

    const handleSearchAll = (event) => {
        if (!clear) {
            setWordEnterd(event.target.value);
            setSearchValue(wordEnterd);
            setSearchButton("Clear");
            setClear(true);
        } else {
            setSearchButton("Search");
            setSearchValue("");
            setWordEnterd("");
            setClear(false)
        }

    }

    const handleArticleSearchClose = () => {
        setShowArticleSearch("");
    }

    return (
        <>
            <div className="Search">
                <div className="search-bar">
                    <input className="search-input" placeholder={placeholder}
                        type="text" onChange={handleSearch} />
                    <button className="search-button"
                        onClick={handleSearchAll}>{searchButton}</button>
                </div>
                {
                    wordEnterd !== "" && (
                        <div className="data-result">
                            {
                                posts.slice(0, 15).map((post) => {
                                    if (post.title.toLowerCase().includes(wordEnterd.toLowerCase()) ||
                                        post.tags.toLowerCase().split().some(e => e.includes(wordEnterd.toLowerCase()))) {
                                        return <div key={post._id}
                                            className='search-items'
                                            onClick={(e) => setShowArticleSearch(post._id)}>
                                            {post.title}</div>
                                    } else {
                                        return <div key={post._id}></div>
                                    }
                                })
                            }
                        </div>
                    )
                }

            </div>
            {showArticleSearch !== "" && (
                <Article handleArticleClose={handleArticleSearchClose} postId={showArticleSearch} />
            )}
        </>


    );
};

export default SearchBox;