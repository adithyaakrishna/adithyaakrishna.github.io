import React, { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { THEME_ANIMATION_SHAPE } from '@config';

const THEME_KEY = 'theme';
const THEME_COLORS = { light: '#F2EFE9', dark: '#121212' };

function getOriginFromEvent(event, vw, vh) {
  const fallback = { x: vw / 2, y: vh / 2 };
  if (!event?.target) return fallback;
  const toggle = event.target.closest('.theme-toggle');
  const el = toggle || event.target;
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      setThemeState(saved);
    }
  }, []);

  const changeThemeWithReveal = (newTheme, event) => {
    if (newTheme === theme) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const shape = THEME_ANIMATION_SHAPE;
    const isFade = shape === 'fade';

    const oldTheme = theme;
    const { x, y } = getOriginFromEvent(event, vw, vh);

    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    const willChange = isFade ? 'opacity' : 'clip-path';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: ${THEME_COLORS[oldTheme]};
      pointer-events: none;
      z-index: 99999;
      will-change: ${willChange};
      transform: translateZ(0);
      backface-visibility: hidden;
      contain: paint;
    `;
    document.body.appendChild(overlay);

    const runTransition = () => {
      document.documentElement.setAttribute('data-theme-transitioning', 'true');
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      setThemeState(newTheme);

      if (isFade) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            overlay.remove();
            requestAnimationFrame(() => {
              document.documentElement.removeAttribute('data-theme-transitioning');
            });
          },
        });
        return;
      }

      const maxSize = Math.ceil(Math.max(vw, vh) * 1.85);
      const startW = 80;
      const startH = 40;
      const clipEndSize = maxSize * 0.9;

      const obj = { w: startW, h: startH };
      const tl = gsap.timeline({
        onComplete: () => {
          overlay.remove();
          requestAnimationFrame(() => {
            document.documentElement.removeAttribute('data-theme-transitioning');
          });
        },
      });

      tl.to(obj, {
        w: clipEndSize,
        h: clipEndSize,
        duration: 0.65,
        ease: 'power2.out',
        onUpdate: () => {
          const l = Math.round(x - obj.w / 2);
          const t = Math.round(y - obj.h / 2);
          const r = Math.round(l + obj.w);
          const b = Math.round(t + obj.h);
          overlay.style.clipPath = `polygon(evenodd, 0 0, 0 100%, 100% 100%, 100% 0, 0 0, ${l}px ${t}px, ${r}px ${t}px, ${r}px ${b}px, ${l}px ${b}px, ${l}px ${t}px)`;
          overlay.style.webkitClipPath = overlay.style.clipPath;
        },
      }).to(
        overlay,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
        },
        '-=0.05'
      );
    };

    requestAnimationFrame(runTransition);
  };

  const value = { theme, setThemeState, changeThemeWithReveal, THEME_KEY };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: 'dark',
      changeThemeWithReveal: (theme, evt) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
      },
      THEME_KEY,
    };
  }
  return ctx;
}
