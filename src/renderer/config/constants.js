const TOOL_TOP = 300;
const TOOL_RIGHT = 20;
const MENU_TOP = 10;
const MENU_RIGHT = 50;

const dev =  {
  CONFIG_LOCAL_STORAGE_KEY: 'CONFIG_PT_TOOLS',
  TOUCH_WORKSTATION_IP: '10.10.123.34',
  // TOUCH_WORKSTATION_IP: '10.10.104.246',
  // TOUCH_WEB_SERVER_URL: 'http://10.10.104.246',
  TOUCH_WEB_SERVER_URL: 'http://127.0.0.1',
  SCROLL_VIDEO_SERVER_URL: 'http://127.0.0.1/scrolly',
  NEWS_PREVIEW_SERVER_LOCAL_URL: 'http://127.0.0.1/html/news-preview',
  NEWS_PREVIEW_SERVER_REMOTE_URL: 'http://10.10.104.246/html/news-preview',
  LOGLESS_REDUX_ACTIONS: [
    'playerSlice/setPlayerCurrentTime',
    'playerSlice/setPlayerProgress',
  ],
  POSITION: {
    toolContainer: {
      top: `${TOOL_TOP}px`,
      right: `${TOOL_RIGHT}px`,
    },
    drawHandler: {
      top: `${TOOL_TOP-30}px`,
      right: `${TOOL_RIGHT+46}px`,
    },
    videoControl: {
      top: `${TOOL_TOP-150}px`,
      right: `${TOOL_RIGHT}px`,
      left: `${TOOL_RIGHT}px`,
    },
    menuContainer: {
      top: `${MENU_TOP}px`,
      right: `${MENU_RIGHT}px`,
    },
    menuDraw: {
      top: `${MENU_TOP+10}px`,
      right: `${MENU_RIGHT-30}px`,
    },
  },
  ENABLE_V_MENU: true,
  TRANSITIONS: {
    noTransition: {
      delay: 100,
    },
    cssTransition: {
      delay: 500,
    },
    videoTransition: {
      delay: 500,
    },
  },
  IS_TRANSITION_FULL: false,
  SWIPE_MODES: {
    NORMAL: 'NORMAL',
    FADE: 'FADE',
    ROTATE: 'ROTATE',
    CARD: 'CARD',
  },
  SYNC_ASSET_KEYS: {
    base: ['displayMode', 'assetTexts'],
    sources: [
      'objectFit',
      'scale',
      'translateX',
      'translateY',
      'autoplay'
    ],
  },
  EASINGS : {
    LINEAR: "cubic-bezier(0, 0, 1, 1)",
    FAST_IN: "cubic-bezier(0, 0.55, 0.45, 1)",
    OVER_OUT: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  }
}

const prd = {
  ...dev,
  TOUCH_WORKSTATION_IP: '10.10.104.246',
  TOUCH_WEB_SERVER_URL: 'http://10.10.104.246',
  SCROLL_VIDEO_SERVER_LOCAL_URL: 'http://127.0.0.1/scrolly',
  SCROLL_VIDEO_SERVER_REMOTE_URL: 'http://10.10.104.246/scrolly',
}

export default process.env.NODE_ENV === 'development' ? dev : prd;
