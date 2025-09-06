import React from 'react';
import styled from 'styled-components';
import HLSPlayer from 'renderer/Components/HLSPlayer';
import WebView from './WebView';
import ImageBox from './ImageBox';

const Container = styled.div`
  height: 100%;
  width: 100%;
  /* height: ${(props) => (props.show ? '100%' : '0%')}; */
  /* width: ${(props) => (props.show ? '100%' : '0%')}; */
  display: ${(props) => (props.show ? 'block' : 'none')};
  /* visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; */
  /* width: ${(props) => (props.show ? '100%' : '0%')}; */
  /* transition: all 1s; */
  /* visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; */
  overflow: hidden;
  /* filter: grayscale(100%); */
  /* filter: ${(props) => props.drawOn && 'grayscale(100%)'}; */
  /* filter: ${(props) => props.drawOn && 'contrast(175%) brightness(103%)'}; */
  /* ${(props) => props.drawOn && 'transform: scale(1.2)'}; */
  transition: transform 0.5s;
`

const AssetMap = {
  web: WebView,
  video: HLSPlayer,
  image: ImageBox,
};

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { options, show, drawOn } = props;
  const { assetType, ...remainOpts } = options;
  const Asset = AssetMap[assetType];

  return (
    <Container show={show} drawOn={drawOn}>
      <Asset {...remainOpts} />
    </Container>
  )

};

export default React.memo(AssetContainer);
