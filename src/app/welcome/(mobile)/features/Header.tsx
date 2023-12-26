import { Logo, MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

const Header = memo(() => <MobileNavBar center={<div className="global_logo">微帝国AI</div>} />);
// const Header = memo(() => <MobileNavBar center={<Logo type={'text'} />} />);

export default Header;
