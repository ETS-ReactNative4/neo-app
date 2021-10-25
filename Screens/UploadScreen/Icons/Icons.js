import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Camera(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 16,
        height: 16,
        viewBox: '0 0 24 24',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M8 3a1 1 0 000 2h3a1 1 0 100-2H8zM6 8a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2H6zm-4 2a4 4 0 014-4h12a4 4 0 014 4v8a4 4 0 01-4 4H6a4 4 0 01-4-4v-8zm10 1a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 1110 0 5 5 0 01-10 0z',
      clipRule: 'evenodd',
    }),
  );
}

export function Image(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 16,
        height: 16,
        viewBox: '0 0 24 24',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M9 1a4 4 0 00-4 4 4 4 0 00-4 4v9a4 4 0 004 4h9a4 4 0 004-3.987V18a4 4 0 004-4V5a4 4 0 00-4-4H9zm9 15a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2h7a4 4 0 014 4v7zM5 7a2 2 0 00-2 2v9a2 2 0 002 2h.5l5.7-7.6a1 1 0 011.507-.107L16 15.586V9a2 2 0 00-2-2H5zm7.108 7.522L8 20h6a2 2 0 001.964-1.622l-3.856-3.856zM6.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
      clipRule: 'evenodd',
    }),
  );
}

export function Document(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 18,
        height: 18,
        viewBox: '0 0 18 18',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M3.75 0C1.67893 0 0 1.67893 0 3.75V14.25C0 16.3211 1.67893 18 3.75 18H14.25C16.3211 18 18 16.3211 18 14.25V3.75C18 1.67893 16.3211 0 14.25 0H3.75ZM1.5 3.75C1.5 2.50736 2.50736 1.5 3.75 1.5H14.25C15.4926 1.5 16.5 2.50736 16.5 3.75V14.25C16.5 15.4926 15.4926 16.5 14.25 16.5H3.75C2.50736 16.5 1.5 15.4926 1.5 14.25V3.75ZM5.25 4.5C4.83579 4.5 4.5 4.83579 4.5 5.25C4.5 5.66421 4.83579 6 5.25 6H12.75C13.1642 6 13.5 5.66421 13.5 5.25C13.5 4.83579 13.1642 4.5 12.75 4.5H5.25ZM4.5 9C4.5 8.58579 4.83579 8.25 5.25 8.25H12.75C13.1642 8.25 13.5 8.58579 13.5 9C13.5 9.41422 13.1642 9.75 12.75 9.75H5.25C4.83579 9.75 4.5 9.41422 4.5 9ZM5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5H12.75C13.1642 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12H5.25Z',
      clipRule: 'evenodd',
    }),
  );
}

export function Plus(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 16,
        height: 16,
        viewBox: '0 0 24 24',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M11 19a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5a1 1 0 10-2 0v6H5a1 1 0 100 2h6v6z',
      clipRule: 'evenodd',
    }),
  );
}

export function Delete(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 16,
        height: 16,
        viewBox: '0 0 24 24',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M9 5a1 1 0 011-1h4a1 1 0 011 1H9zM7 5a3 3 0 013-3h4a3 3 0 013 3h4a1 1 0 110 2h-1v12a3 3 0 01-3 3H7a3 3 0 01-3-3V7H3a1 1 0 010-2h4zm9 2H6v12a1 1 0 001 1h10a1 1 0 001-1V7h-2zm-5 4a1 1 0 10-2 0v6a1 1 0 102 0v-6zm4 0a1 1 0 10-2 0v6a1 1 0 102 0v-6z',
      clipRule: 'evenodd',
    }),
  );
}

export function Checkmark(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 16,
        height: 14,
        viewBox: '0 0 16 14',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M14.6248 1.21915C15.0561 1.56416 15.126 2.19345 14.781 2.62471L6.78097 12.6247C6.60328 12.8468 6.33941 12.9828 6.0554 12.9985C5.77139 13.0142 5.49413 12.9082 5.29299 12.7071L1.29297 8.7071C0.902442 8.31657 0.902441 7.68341 1.29296 7.29288C1.68349 6.90236 2.31665 6.90236 2.70718 7.29288L5.91718 10.5029L13.2192 1.37532C13.5642 0.944061 14.1935 0.87414 14.6248 1.21915Z',
      clipRule: 'evenodd',
    }),
  );
}

export function Close(props) {
  return React.createElement(
    Svg,
    Object.assign(
      {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        fill: '#aaaaaa',
      },
      props,
    ),
    React.createElement(Path, {
      fillRule: 'evenodd',
      d:
        'M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.58579 8L0.292894 14.2929C-0.0976304 14.6834 -0.0976304 15.3166 0.292894 15.7071C0.683417 16.0976 1.31658 16.0976 1.70711 15.7071L8 9.41421L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L9.41421 8L15.7071 1.70711C16.0976 1.31658 16.0976 0.683417 15.7071 0.292893C15.3166 -0.0976311 14.6834 -0.0976311 14.2929 0.292893L8 6.58579L1.70711 0.292893Z',
      clipRule: 'evenodd',
    }),
  );
}
