import React from 'react'

type Props = {}

export const AlbumTableHeader = (props: Props) => {
  return (
    <tr id="header-row">
            <th id="name">
                <h5>Name</h5>
            </th>
            <th id="duration">
                <h5>Duration</h5>
            </th>
        </tr>
  )
}