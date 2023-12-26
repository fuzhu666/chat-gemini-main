import { Logo, MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

const Header = memo(() => {
  return <MobileNavBar center={<div className="global_logo">微帝国AI</div>} />;
  // return <MobileNavBar center={<Logo type={'text'} />} />;
});

export default Header;
