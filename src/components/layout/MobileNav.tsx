'use client';

import { Menu, X } from 'lucide-react';
import { useRef } from 'react';

import { NAV_LINKS } from '@/data/profile';

const POPOVER_ID = 'primary-navigation';

/**
 * Mobile navigation.
 *
 * Built on the native popover API, so Escape to close, click-outside dismissal,
 * top-layer stacking and the invoker's expanded state all come from the platform
 * rather than from hand-rolled listeners. The only behaviour left to add is
 * closing on navigate, which popovers deliberately do not do for you.
 */
export function MobileNav() {
  const menu = useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        type="button"
        popoverTarget={POPOVER_ID}
        className="surface-interactive grid size-11 place-items-center text-slate-600 lg:hidden dark:text-slate-300"
      >
        <Menu aria-hidden="true" className="size-4" />
        <span className="sr-only">Open navigation</span>
      </button>

      <div ref={menu} id={POPOVER_ID} popover="auto" className="nav-popover lg:hidden">
        <div className="flex items-center justify-between px-3 pt-1 pb-3">
          <span className="eyebrow">Navigate</span>
          <button
            type="button"
            popoverTarget={POPOVER_ID}
            popoverTargetAction="hide"
            className="tap-area grid size-9 place-items-center rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => menu.current?.hidePopover()}
                className="tap-area block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
