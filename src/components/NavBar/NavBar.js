import React from 'react';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Smart App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" onClick={() => props.changeUser("privilage")}>Privilage <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" onClick={() => props.changeUser("admin")}>Admin</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;