/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ReloadButton from 'renderer/Components/Common/ReloadButton';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: black;
  aspect-ratio: 16/9;
`;

const CustomVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  object-position: ${props => props.objectPosition};
  transform: ${(props)=> `scale(${props.scale}) translateX(${props.translateX}%) translateY(${props.translateY}%)`};
`;

function MP4Player(props, ref) {
  const {
    source = {},
    onClick,
    setPlayer,
    aspectRatio,
    objectFit = 'cover',
    objectPosition = '50% 50%',
    scale = 1,
    translateX = 0,
    translateY = 0,
    show,
    displayMode
  } = props;

  const { url } = source;

  // const [reloadTrigger, setReloadTrigger] = React.useState(true);
  React.useRef(() => {
    const durationSec = parseInt(ref.current.duration, 10);
    const isLive = durationSec === 0;
    if (!isLive && show && displayMode !== 'swipe') {
      ref.current.currentTime = 0;
      ref.current.play();
    }
    if (!isLive && !show){
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, []);

  const onLoadDataHandler = React.useCallback((event) => {
    // console.log(lastLoaded)
      if (ref.current === null) {
        return;
      }
      // console.log('loadedMetadata mp4', ref.current.duration);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(ref.current.duration)) {
        ref.current.play();
      }
    },
    [ref],
  );

  React.useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }
    ref.current.addEventListener('loadedmetadata', onLoadDataHandler);
    // eslint-disable-next-line consistent-return
    return () => {
      if (ref.current === null) return;
      ref.current.removeEventListener( 'loadedmetadata', onLoadDataHandler);
    };
  }, [onLoadDataHandler, ref, setPlayer]);

  const reloadPlayer = React.useCallback(() => { 
    ref.current.load();
  }, [ref]);

  return (
    <Container>
      <CustomVideo
        ref={ref}
        src={url}
        muted
        width="100%"
        crossOrigin="anonymous"
        aspectRatio={aspectRatio}
        objectFit={objectFit}
        objectPosition={objectPosition}
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        onClick={onClick}
      />
      <ReloadButton reload={reloadPlayer} />
    </Container>
  );
}

export default React.memo(React.forwardRef(MP4Player));
