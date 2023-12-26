import { memo, useEffect } from 'react';

const PageTitle = memo<{ title: string }>(({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} · 微帝国AI` : '微帝国AI';
  }, [title]);

  return null;
});

export default PageTitle;
