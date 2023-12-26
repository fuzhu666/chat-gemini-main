import { css } from 'antd-style';

export default ({ prefixCls }: { prefixCls: string }) => css`
  html,
  body,
  #__next,
  .${prefixCls}-app {
    position: relative;
    overscroll-behavior: none;
    height: 100% !important;
    min-height: 100% !important;

    ::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }

  p {
    margin-bottom: 0;
  }

  .global_logo {
    font-size: 24px;
    color: #000;
  }

  @media (max-width: 575px) {
    * {
      ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    }
  }
`;
