import React from 'react'

interface Props {
    
}

export const SearchButton = (props: Props) => {
    return (
        <a id="search-button" href="/search">
            <div>
                <img src="/images/search.png" alt="Wasn't found!"></img>
            </div>
            <h3>Search</h3>
        </a>
    )
}
