import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
    return (
        <div className="welcome-container">
            <h1 className="welcome-heading">Welcome to Amicus Farm</h1>
            
            <div className="section-container">
                <div className="section livestock">
                    <h2><Link to="/livestock">Livestock</Link></h2> {/* Link to Livestock management */}
                </div>
            
                <div className="section garden">
                    <h2><Link to="/addplant">Garden</Link></h2> {/* Link to AddPlant */}
                </div>

                {/* Production Section linked to AddProduction page */}
                <div className="section production">
                    <h2><Link to="/addproduce">Production</Link></h2> {/* Link to AddProduce*/}
                </div>

                {/* Sales Section linked to AddSale page */}
                <div className="section sales">
                    <h2><Link to="/addsale">Sales</Link></h2> {/* Link to AddSale */}
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
