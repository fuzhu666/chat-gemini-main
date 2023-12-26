import { URLS } from '@/services/_url';
import { 微帝国AIAgentsMarketIndex } from '@/types/market';

class MarketService {
  getAgentList = async (locale: string): Promise<微帝国AIAgentsMarketIndex> => {
    const res = await fetch(`${URLS.market}?locale=${locale}`);

    return res.json();
  };

  /**
   * 请求助手 manifest
   */
  getAgentManifest = async (identifier: string, locale: string) => {
    if (!identifier) return;
    const res = await fetch(`${URLS.market}/${identifier}?locale=${locale}`);

    return res.json();
  };
}
export const marketService = new MarketService();
