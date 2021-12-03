import React from 'react'

export const PlayerTableHeader: React.FC = () => {
    return (
        <tr id="header-row">
            <th id="name">
                <h5>Name</h5>
            </th>
            <th id="artist">
                <h6>Artist</h6>
            </th>
            <th id="album">
                <h6>Album</h6>
            </th>
            <th id="duration">
                <h6>Duration</h6>
            </th>
        </tr>
    )
}
