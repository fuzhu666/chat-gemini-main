import { Logo, MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

import ShareAgentButton from '../../features/ShareAgentButton';

const Header = memo(() => {
  return <MobileNavBar center={<div className="global_logo">微帝国AI</div>} right={<ShareAgentButton mobile />} />;
  // return <MobileNavBar center={<Logo type={'text'} />} right={<ShareAgentButton mobile />} />;
});

export default Header;
