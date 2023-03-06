import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__language">
        <li>
          <Link to="/">English(UK)</Link>
        </li>
        <li>
          <Link to="/">Français(FR)</Link>
        </li>
        <li>
          <Link to="/">العربية</Link>
        </li>
        <li>
          <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
        </li>
        <li>
          <Link to="/">Español (España)</Link>
        </li>
        <li>
          <Link to="/">italiano</Link>
        </li>
        <li>
          <Link to="/">Deutsch</Link>
        </li>
        <li>
          <Link to="/">Português (Brasil)</Link>
        </li>
        <li>
          <Link to="/">हिन्दी</Link>
        </li>
        <li>
          <Link to="/">中文(简体)</Link>
        </li>
        <li>
          <Link to="/">日本語</Link>
        </li>
        <li>
          {' '}
          <Link to="/" className="footer_square">
            <i className="plus_icon"></i>
          </Link>
        </li>
      </ul>
      <ul className="footer__links">
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Messenger</Link>
        <Link to="/">Facebook Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Places</Link>
        <Link to="/">Games</Link>
        <Link to="/">Marketplace</Link>
        <Link to="/">Facebook Pay</Link>
        <Link to="/">Oculus</Link>
        <Link to="/">Portal</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">Bulletin</Link>
        <Link to="/">Local</Link>
        <Link to="/">Fundraisers</Link>
        <Link to="/">Services</Link>
        <Link to="/">Voting Information Centre</Link>
        <Link to="/">Groups</Link>
        <Link to="/">About</Link>
        <Link to="/">Create ad</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </ul>

      <p class="copywrite">Meta &copy; 2023</p>
    </div>
  );
};

export default Footer;
