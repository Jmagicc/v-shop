import { request } from '@/utils/request';

/**
 * Banner列表
 */
export function bannerList(data?: Recordable) {
  return request({
    url: `/api/collections/t4oj5dma4cxyhgo/records`,
    method: 'get',
    params: {
      page: 1,
      perPage: 40,
      sort: '-created',
      skipTotal: 1,
      ...data,
    },
  });
}

export default {
  bannerList,
};
