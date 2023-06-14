import { Logo } from '../components';      /* 可以在叫Figma的平台上自己绘制logo */  
import main from '../assets/images/main.svg';    /* 可以在叫undraw.co的网站上找图片*/
import styled from 'styled-components';      /* 允许我们在Javascript里写css */  
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
      <Wrapper> 
        <nav>
          <Logo/>
        </nav>
        <div className = "container page">
            <div className = "info">
              <h1>job <span>tracking</span> app</h1>
              <p>Job tracking app which keep trace of your applications status 
                and helps you better memorize the jobs applied and make further arrangement.</p>
            <Link to = '/register' className = 'btn btn-hero'>Login/Register </Link>
            </div>
            <img src = {main} alt = "job hunt" className = 'img main-img' />
        </div>
         
      </Wrapper>
    )
};


/* 下面的这些css code独归landing page所有，只定义landing的排版*/
const Wrapper = styled.main`        
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;


export default Landing;