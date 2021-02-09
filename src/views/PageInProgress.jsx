import { useEffect, useState } from 'react';
import { Button, Container, Fade } from 'shards-react';
import { Link } from 'react-router-dom';
import monsters1 from '../assets/monsters1.svg';
import monsters2 from '../assets/monsters2.svg';
import monsters3 from '../assets/monsters3.svg';
import monsters4 from '../assets/monsters4.svg';
import monsters5 from '../assets/monsters5.svg';
import monsters6 from '../assets/monsters6.svg';
import useInterval from '../hooks/useInterval';

const randomImage = () => {
  const rand = (Math.floor(Math.random() * 6) + 1).toString();
  return {
    '1': monsters1,
    '2': monsters2,
    '3': monsters3,
    '4': monsters4,
    '5': monsters5,
    '6': monsters6,
  }[rand];
};

const PageInProgress = () => {
  const [image, setImage] = useState(randomImage());

  useInterval(() => {
    setImage(randomImage());
  }, 3500);

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <Fade in={image}>
            <img src={image} alt="monsters" width={250} height={250}/>
          </Fade>
          <h3 className="gradient-text">This page is under construction.</h3>
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
};
export default PageInProgress;
