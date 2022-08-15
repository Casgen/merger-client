import React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
	return (
		<div id="home-page">
			<div id="home-title">
				Two worlds merged into one.
			</div>
			<div id="icons">
				<img src="/images/spotify.png" alt="spotify logo"/>
				<img src="/images/youtube.png" alt="spotify logo"/>
			</div>
			<Link to="/login">
				Click here to login
			</Link>
		</div>
	)
}
