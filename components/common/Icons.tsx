import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = {
  Logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M7 13c.83.83 2.17.83 3 0 .83-.83.83-2.17 0-3-.83-.83-2.17-.83-3 0" />
      <path d="M12 12h.01" />
      <path d="M17 10c-.83-.83-2.17-.83-3 0-.83.83-.83 2.17 0 3 .83.83 2.17.83 3 0" />
    </svg>
  ),
  Clock: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Fire: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
       <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  WhatsApp: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.75 13.96c.25.13.43.2.5.28.07.08.15.18.2.33.05.15.08.33.08.53 0 .4-.1.78-.24 1.13-.15.35-.38.68-.7.98-.33.3-.7.58-1.1.83-.4.25-.83.43-1.3.55-.48.13-1 .18-1.55.18-.93 0-1.83-.15-2.68-.43-.85-.28-1.63-.7-2.34-1.23s-1.34-1.15-1.85-1.85-1-1.48-1.24-2.34c-.28-.85-.43-1.75-.43-2.68 0-.55.05-1.08.18-1.55.13-.48.33-.9.56-1.3.23-.4.5-.78.83-1.1.32-.32.65-.55.98-.7.35-.15.7-.23 1.13-.23.2 0 .38.03.53.08.15.05.25.13.33.2.08.07.18.15.28.2.1.07.18.1.2.13.03.02.05.03.05.03l.03.03c.03.02.05.03.08.05.25.13.4.28.48.45.08.17.1.35.1.5s-.05.28-.13.38c-.08.1-.18.18-.3.25-.13.08-.28.1-.45.1-.17 0-.33-.03-.48-.08-.15-.05-.3-.1-.45-.13-.15-.03-.3-.05-.45-.05-.3 0-.58.05-.83.15-.25.1-.48.25-.68.45-.18.2-.33.4-.45.63-.12.23-.18.48-.18.73s.05.48.13.7c.08.23.2.43.38.6s.38.3.6.38c.2.08.43.12.65.12.23 0 .45-.03.65-.08.2-.05.38-.13.53-.2.15-.08.28-.13.4-.15.13-.03.25-.03.35-.03.17 0 .33.03.48.08.15.05.28.13.4.2.1.08.2.18.25.3.05.12.08.25.08.4z"/>
    </svg>
  ),
  Print: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  ),
};
