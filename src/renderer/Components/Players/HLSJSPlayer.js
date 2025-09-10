/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ReactHlsPlayer from '../ReactHlsPlayer';

const Conatiner = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: black;
  aspect-ratio: 16/9;
`;
const CustomPlayer = styled(ReactHlsPlayer)`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  object-position: ${props => props.objectPosition};
  transform: ${(props)=> `scale(${props.scale}) translateX(${props.translateX}%) translateY(${props.translateY}%)`};
`;

const hlsConfig = {
  enableWorker: false,
  debug: false,

  liveBackBufferLength: 15,
  backBufferLength1: 15,
  liveMaxBackBufferLength: 15,
  maxBufferSize: 0,
  maxBufferLength: 10,
  liveSyncDurationCount: 1,

  // backBufferLength: 0,
  // liveBackBufferLength: 0,
  // liveMaxBackBufferLength: 0,
  // maxBufferSize: 10,
  // maxBufferLength: 10 * 1000 * 1000,
};

function HLSJSPlayer(props, ref) {
  const {
    source,
    onClick,
    setPlayer,
    lastLoaded,
    aspectRatio,
    objectFit = 'cover',
    objectPosition = '50% 50%',
    scale = 1,
    translateX = 0,
    translateY = 0,
  } = props;
  const { url } = source;
  console.log('re-render player:', props, source, ref.current);
  const [reloadTrigger, setReloadTrigger] = React.useState(true);
  const onLoadDataHandler = React.useCallback((event) => {
    console.log('^^^',event)
    event.target.play();
  }, []);

  React.useLayoutEffect(() => {
    // setPlayer(cctvIndex, playerRef.current);
    console.log('^^^', ref.current)
    if(ref.current === null) return;
    ref.current.addEventListener('loadedmetadata', onLoadDataHandler);
    return () => {
      if (ref.current === null) return;
      ref.current.removeEventListener('loadedmetadata', onLoadDataHandler);
    }
  }, [onLoadDataHandler, ref, setPlayer]);

  React.useEffect(() => {
    // console.log('reload while get next player: ', lastLoaded, cctvIndex);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setReloadTrigger((reloadTrigger) => {
      return !reloadTrigger;
    });
  }, [lastLoaded]);

  return (
    <Conatiner>
      <CustomPlayer
        ref={ref}
        src={url}
        autoPlay={reloadTrigger}
        hlsConfig={hlsConfig}
        muted
        width="100%"
        aspectRatio={aspectRatio}
        objectFit={objectFit}
        objectPosition={objectPosition}
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        onClick={onClick}
      />
    </Conatiner>
  );
};

export default React.memo(React.forwardRef(HLSJSPlayer));
