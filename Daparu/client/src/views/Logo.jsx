import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ width }) => {
    return (
        <center>
            <Link to="/"><img src="/logo.png" width={width} alt="Logo" /></Link>
        </center>
    );
};

export default Logo;