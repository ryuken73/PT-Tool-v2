/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import PlayIndicator from 'renderer/Components/Common/PlayIndicator';
import ReloadButton from 'renderer/Components/Common/ReloadButton';
import CSSToggleMenu from 'renderer/Components/Menus/CSSToggleMenu';
import MP4Player from './MP4Player';
import HLSJSPlayer from './HLSJSPlayer';
import YoutubeJSPlayer from './YoutubeJSPlayer';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const viewMap = {
  mp4: MP4Player,
  hls: HLSJSPlayer,
  ytb: YoutubeJSPlayer,
};

const mp4RegExp = /.*\.mp4.*/;
const youtubeRegExp = /.*youtube.com\/.*/;

export default function AssetComponent(props) {
  const {
    assetId,
    src,
    srcId,
    show,
    srcIndex,
    objectFit,
    objectPositionLR='50%',
    objectPositionTB='50%',
    scale = 1,
    translateX = 0,
    translateY = 0,
    autoplay=true,
    displayMode,
    isSwipeActive,
  } = props;

  const isFirstImage = srcIndex === 0;
  const playerRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlaying = React.useCallback(() => {
    setIsPlaying(true);
  }, []);
  const handlePause = React.useCallback(() => {
    setIsPlaying(false);
  }, []);

  React.useEffect(() => {
    if (playerRef.current === null) return () => {};
    playerRef.current.addEventListener('playing', handlePlaying);
    playerRef.current.addEventListener('pause', handlePause);
    return () => {
      if (playerRef.current === null) return;
      playerRef.current.removeEventListener('playing', handlePlaying);
      playerRef.current.removeEventListener('pause', handlePause);
    }
  }, [handlePause, handlePlaying, playerRef]);

  React.useEffect(() => {
    if (playerRef.current === null) return () => {};
    if (isSwipeActive && displayMode === 'swipe' && show) {
      // console.log('XXXX rewind clip and set play')
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    };
    if (!isSwipeActive && displayMode === 'swipe' && show) {
      // console.log('XXXX rewind clip and set play')
      playerRef.current.currentTime = 0;
      playerRef.current.pause();
    };
    if (!autoplay){
      // console.log('XXXX rewind clip and set pause')
      playerRef.current.currentTime = 0;
      playerRef.current.pause();
    }
    // console.log('XXXX done')
  }, [isSwipeActive, playerRef, displayMode, show, autoplay]);

  const onClick = React.useCallback(() => {
    if (displayMode === 'brush') return;
    if (playerRef.current === null) return;
    if (playerRef.current.paused) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [displayMode]);

  // const isPlaying = true;
  const source = {
    url: src,
  };
  const type = mp4RegExp.test(source.url)
    ? 'mp4'
    : youtubeRegExp.test(source.url)
      ? 'ytb'
      : 'hls';
  const Viewer = viewMap[type];
  return (
    <Container>
      {show && (
        <CSSToggleMenu
          assetId={assetId}
          srcId={srcId}
          objectFit={objectFit}
          objectPositionLR={objectPositionLR}
          objectPositionTB={objectPositionTB}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
          autoplay={autoplay}
        />
      )}
      <Viewer 
        ref={playerRef} 
        source={source} 
        onClick={onClick}
        setPlayer={()=>{}} 
        {...props} 
      />
      <PlayIndicator isPlaying={isPlaying} />
    </Container>
  )
}
