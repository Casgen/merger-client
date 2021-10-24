import axios from 'axios';
import { FC, useState } from 'react'
import { TextField } from './TextField';
import "../css/login.css";


export const Login: FC = () => {
    return (
        <a id="login-button" href="http://localhost:8080/spotify/auth/login">
            LOGIN
        </a>
    )
}
