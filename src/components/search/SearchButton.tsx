import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    
}

export const SearchButton = (props: Props) => {
    return (
        <Link id="search-button" to="/spotify/search">
            <div>
                <img src="/images/search.png" alt="Wasn't found!"></img>
            </div>
            <h3>Search</h3>
        </Link>
    )
}
