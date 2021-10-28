import React from 'react';
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navcontainer" onClick={()=>{
                window.location.href="/"
            }}
            >
                <h1 className="head">ETHEREAL</h1>
                <hr/>
                {/* <img src="https://image.freepik.com/free-vector/ethereum-blockchain-cryptocurrency-logo-vector-open-source-finance-concept_53876-140594.jpg" width="80px"  align="left"/> */}
                </div>

                <div className="list">
                    <ul>
                        <a href="/">
                            <li className="navlist">HOME</li>
                        </a>
                        <a href="/accounts">
                            <li className="navlist">ACCOUNTS</li>
                        </a>
                        <a href="/create">
                            <li className="navlist">CREATE ACCOUNT</li>
                        </a>
                    </ul>
                </div>
                <hr/>
            </div>
    )
}

export default Navbar
