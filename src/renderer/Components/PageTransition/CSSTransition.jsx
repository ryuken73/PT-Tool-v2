import React from 'react';
import styled, { css, keyframes } from 'styled-components';
// import { keyframes } from '@emotion/react'
import useAssetState from 'renderer/hooks/useAssetState';

const changeAnimation = keyframes`
  0% {
    height: 100%;
    opacity: 1;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 0, 0 50%, 100% 50%, 100% 100%, 0 100%, 0 50%);
  }
  50% {
    height: 100%;
    opacity: 1;
    /* clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%, 0 0, 0 75%, 100% 75%, 100% 100%, 0 100%, 0 75%); */
  }
  100% {
    height: 100%;
    opacity: 0.7;
    clip-path: polygon(0 0, 100% 0, 100% 1%, 0 1%, 0 0, 0 99%, 100% 99%, 100% 100%, 0 100%, 0 99%);
  }
`;

const animation = css`
  /* ${changeAnimation} 1s cubic-bezier(.78,.01,1,-0.08); */
  /* ${changeAnimation} 2s cubic-bezier(.25,.41,.74,-0.65); */
  ${changeAnimation} 0.2s cubic-bezier(.73,.15,.96,.14);
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  height: ${(props) => (props.assetChanged ? '100%' : '0%')};
  width: 100%;
  z-index: 10000;
  animation: ${(props) => props.assetChanged && animation};
  animation-delay: 0.1s;
  transform-origin: 0% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141E30;
  /* background: linear-gradient(to right, #24243e, #141E30, #0f0c29); } */
  background: linear-gradient(to right, #24243e, #141E30); }
`;

const ThickText = styled.h1`
  display: ${(props) => !props.assetChanged && 'none'};
  position: relative;
  /* background: linear-gradient(to right, #24243e, #141E30, #0f0c29); */
  background: linear-gradient(to right, #24243e, #141E30);
  text-transform: Uppercase;
  margin-bottom: .5em;
  font-family: 'Rubik', sans-serif;
  font-size: 12rem;
  color: #E4E5E6;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:before, &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
  }
  &:before {
    z-index: -1;
    text-shadow: -0.001em -0.001em 1px rgba(255,255,255,.15)}
  }
  &:after {
    z-index: -2;
    text-shadow: 10px 10px 10px rgba(0,0,0,.5), 20px 20px 20px rgba(0,0,0,.4), 30px 30px 30px rgba(0,0,0,.1);
    mix-blend-mode: multiply;
  }
`;

const PageTransition = () => {
  const { currentAssetIndex } = useAssetState();
  const [assetChanged, setAssetChanged] = React.useState(false);

  React.useEffect(() => {
    setAssetChanged(true);
  }, [currentAssetIndex]);

  const onAnimationEnd = React.useCallback(() => {
    setAssetChanged(false);
  }, []);
  return (
    <Container onAnimationEnd={onAnimationEnd} assetChanged={assetChanged}>
      <ThickText assetChanged={assetChanged} data-text="SBS News">SBS News</ThickText>
    </Container>
  );
}

// export default React.memo(PageTransition);
export default PageTransition;
