import { useEffect, useRef } from 'react';
import {
  ROULETTE_NUMBERS,
  NUMBER_COLORS,
} from '../constants/roulette.constants';

interface RouletteWheelProps {
  result: number | null;
  onSpinEnd?: () => void;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({
  result,
  onSpinEnd,
}) => {
  const innerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const currentInnerRef = innerRef.current;
    if (result === null || currentInnerRef === null) {
      return;
    }

    currentInnerRef.removeAttribute('data-spintoindex');
    const betIndex = ROULETTE_NUMBERS.indexOf(result);

    setTimeout(() => {
      currentInnerRef.setAttribute('data-spintoindex', `${betIndex}`);
      setTimeout(() => {
        onSpinEnd?.();
      }, 9000);
    }, 100);
  }, [result, onSpinEnd]);

  return (
    <div className="flex justify-center items-center py-8">
      <style>{`
        @keyframes rotate {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        .wheel-plate {
          animation: rotate 3s infinite linear;
        }

        .wheel-inner[data-spintoindex]::before {
          transition: transform 9s cubic-bezier(0.17, 0.67, 0.83, 0.67);
          content: '●';
          color: #fff;
          font-size: 60px;
          display: flex;
        }

        ${ROULETTE_NUMBERS.map(
          (_, index) => `
          .wheel-inner[data-spintoindex='${index}']::before {
            transform: rotateZ(${-2819 + index * 9.73}deg);
          }
        `
        ).join('\n')}
      `}</style>

      <div style={{ width: '374px', margin: '0 auto', userSelect: 'none' }}>
        <div
          className="wheel-plate"
          style={{
            backgroundColor: '#808080',
            width: '350px',
            height: '350px',
            margin: '12px',
            borderRadius: '50%',
            position: 'relative',
          }}
        >
          {/* Borde dorado */}
          <div
            style={{
              content: '',
              display: 'block',
              position: 'absolute',
              borderRadius: '50%',
              top: '-6px',
              right: '-6px',
              bottom: '-6px',
              left: '-6px',
              border: '6px solid #ffd700',
              boxShadow:
                'inset 0px 0px 0px 2px #b39700, 0px 0px 0px 2px #ffeb80',
            }}
          />

          {/* Sombra interior */}
          <div
            style={{
              content: '',
              display: 'block',
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              border: '1px solid #c0c0c0',
              boxShadow: 'inset 0px 0px 0px 2px #808080',
              top: '12%',
              left: '12%',
              right: '12%',
              bottom: '12%',
              zIndex: 1,
            }}
          />

          {/* Lista de números */}
          <ul
            ref={innerRef}
            className="wheel-inner"
            style={{
              display: 'block',
              height: '350px',
              width: '350px',
              position: 'relative',
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
          >
            {ROULETTE_NUMBERS.map((num, index) => {
              const angle = (360 / 37) * index;
              const color = NUMBER_COLORS[num];
              const bgColor =
                color === 'red'
                  ? '#ff0000'
                  : color === 'black'
                  ? '#000'
                  : '#008000';

              return (
                <li
                  key={num}
                  data-bet={num}
                  style={{
                    width: '32px',
                    height: '175px',
                    display: 'inline-block',
                    textAlign: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 'calc(50% - 16px)',
                    transformOrigin: '50% 100%',
                    transform: `rotateZ(${angle}deg)`,
                    backgroundColor: 'transparent',
                    borderLeft: '16px solid transparent',
                    borderRight: '16px solid transparent',
                    borderTop: `175px solid ${bgColor}`,
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      color: '#fff',
                      paddingTop: '12px',
                      width: '32px',
                      display: 'inline-block',
                      fontSize: '12px',
                      transform: 'scale(1, 1.8)',
                      position: 'absolute',
                      top: '-175px',
                      left: '-16px',
                    }}
                  >
                    {num}
                  </span>
                </li>
              );
            })}

            {/* Centro */}
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                borderRadius: '50%',
                zIndex: 3,
                top: '24%',
                right: '24%',
                bottom: '24%',
                left: '24%',
                backgroundColor: '#4d4d4d',
                border: '3px solid #808080',
                background:
                  'radial-gradient(circle, #FFD700 0%, #FFA500 40%, #FF8C00 100%)',
              }}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
