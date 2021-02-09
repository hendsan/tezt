import React from 'react';
import {
  Container,
  Button
} from 'shards-react';
import { Link } from 'react-router-dom';
import monsters_not_found from '../assets/monsters_not_found.svg';

const PageNotFound = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <img src={monsters_not_found} alt="monsters" width={250} height={250} />
        <h3 className="gradient-text">404 Page not found!</h3>
        <p>Please contact the <a
          href="https://t.me/worldtokenofficial"
          target="_blank"
          rel="noopener noreferrer"
        >admins
        </a> for help.
        </p>
        <Link to="/overview"><Button outline theme="accent">&larr; Go to Overview</Button></Link>
      </div>
    </div>
  </Container>
);

export default PageNotFound;
