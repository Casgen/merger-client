import React from 'react'


export const AlbumTableHeader: React.FC = () => {
    return (
        <tr id="header-row">
            <th id="num">
                <h5>#</h5>
            </th>
            <th id="name">
                <h5>Name</h5>
            </th>
            <th id="duration">
                <h5>Duration</h5>
            </th>
        </tr>
    )
}
