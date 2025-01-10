import { request } from '@/utils/request';

/**
 * 抢占秒杀名额
 */
export function goodsSeckillGrab(data?: Recordable) {
  return request({
    url: `/goods/seckill/grab`,
    method: 'post',
    data,
  });
}

/**
 * 商品浏览足迹（历史记录）
 */
export function goodsVisitLog(data?: Recordable) {
  return request({
    url: `/goods/visitLog`,
    method: 'post',
    data,
  });
}

/**
 * 添加浏览足迹
 */
export function goodsVisitLogAdd(data?: Recordable) {
  return request({
    url: `/goods/visitLog/add`,
    method: 'post',
    data,
  });
}

/**
 * 清除所有足迹数据
 */
export function goodsVisitLogClear(data?: Recordable) {
  return request({
    url: `/goods/visitLog/clear`,
    method: 'post',
    data,
  });
}

/**
 * 删除商品足迹
 */
export function goodsVisitLogDelete(data?: Recordable) {
  return request({
    url: `/goods/visitLog/delete`,
    method: 'post',
    data,
  });
}

/**
 * 品牌详情
 */
export function goodsBrandDetail(data?: Recordable) {
  return request({
    url: `/shop/goods/brand/detail`,
    method: 'get',
    params: data,
  });
}

/**
 * 添加品牌收藏
 */
export function goodsBrandFavAdd(data?: Recordable) {
  return request({
    url: `/shop/goods/brand/fav/add`,
    method: 'post',
    data,
  });
}

/**
 * 检测是否已收藏
 */
export function goodsBrandFavCheck(data?: Recordable) {
  return request({
    url: `/shop/goods/brand/fav/check`,
    method: 'get',
    params: data,
  });
}

/**
 * 删除品牌收藏
 */
export function goodsBrandFavDelete(data?: Recordable) {
  return request({
    url: `/shop/goods/brand/fav/delete`,
    method: 'post',
    data,
  });
}

/**
 * 品牌收藏列表
 */
export function goodsBrandFavList(data?: Recordable) {
  return request({
    url: `/shop/goods/brand/fav/list`,
    method: 'post',
    data,
  });
}

/**
 * 品牌列表
 */
export function goodsBrandList(data?: Recordable) {
  return request({
    url: `/shop/goods/brand/list`,
    method: 'post',
    data,
  });
}

/**
 * 商品类别
 */
export function goodsCategoryAll(data?: Recordable) {
  return request({
    url: '/api/collections/wgfdfpq23gkn0b7/records',
    method: 'get',
    params: {
      page: 1,
      perPage: 999,
      sort: '-created',
      skipTotal: 1,
      ...data,
    },
  }).then(res => {
    return res;
  });
}

/**
 * 分类详情
 */
export function goodsCategoryInfo(data?: Recordable) {
  return request({
    url: `/shop/goods/category/info`,
    method: 'get',
    params: data,
  });
}

/**
 * 删除自己发布的商品
 */
export function goodsDel(data?: Recordable) {
  return request({
    url: `/shop/goods/del`,
    method: 'post',
    data,
  });
}

/**
 * 商品详情
 */
export function goodsDetail(data?: Recordable) {
  console.log(data.id,"这里");
  return request({
    url: '/api/collections/0w865dit1pss844/records',
    method: 'get',
    params: {
      page: 1,
      perPage: 999,
      sort: '-created',
      filter: `id='`+ data.id+`'`,
    },
  });
}

/**
 * 添加商品收藏
 */
export function goodsFavAdd(data?: Recordable) {
  return request({
    url: `/shop/goods/fav/add`,
    method: 'post',
    data,
  });
}

/**
 * 检测是否已收藏
 */
export function goodsFavCheck(data?: Recordable) {
  return request({
    url: `/shop/goods/fav/check`,
    method: 'get',
    params: data,
  });
}

/**
 * 删除商品收藏
 */
export function goodsFavDelete(data?: Recordable) {
  return request({
    url: `/shop/goods/fav/delete`,
    method: 'post',
    data,
  });
}

/**
 * 商品收藏列表
 */
export function goodsFavList(data?: Recordable) {
  return request({
    url: `/shop/goods/fav/list`,
    method: 'post',
    data,
  });
}

/**
 * 读取商品的可选配件
 */
export function goodsGoodsAddition(data?: Recordable) {
  return request({
    url: `/shop/goods/goodsAddition`,
    method: 'get',
    params: data,
  });
}

/**
 * 删除商品历史购买记录
 */
export function goodsHisDelete(data?: Recordable) {
  return request({
    url: `/shop/goods/his/delete`,
    method: 'post',
    data,
  });
}

/**
 * 获取购买过的商品列表
 */
export function goodsHisList(data?: Recordable) {
  return request({
    url: `/shop/goods/his/list`,
    method: 'post',
    data,
  });
}

/**
 * 读取商品的限购设置列表
 */
export function goodsLimitation(data?: Recordable) {
  return request({
    url: `/shop/goods/limitation`,
    method: 'get',
    params: data,
  });
}

/**
 * 定义商品接口的请求参数类型
 */
interface GoodsListParams {
  categoryId?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  isShow?: boolean;
}

/**
 * 定义商品数据类型
 */
interface GoodsItem {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  product_name: string;
  description: string;
  actual_price: string;
  main: string;
  wholesale_price: string;
  stock_quantity: number;
  images: string[];
  is_show: boolean;
  product_type: string;
  product_tags: string[];
}

/**
 * 定义响应数据类型
 */
interface GoodsListResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: GoodsItem[];
}

/**
 * 修改商品列表接口
 */
export function goodsList(params: GoodsListParams) {
  const defaultParams = {
    page: 1,
    perPage: 999,
    sort: '-created',
    isShow: true,
  };

  const queryParams = {
    ...defaultParams,
    ...params,
  };

  // 构建 filter 条件
  let filterCondition = `is_show=${queryParams.isShow}`;
  if (queryParams.categoryId) {
    filterCondition = `product_type.name='${queryParams.categoryId}'&&${filterCondition}`;
  }

  return request<GoodsListResponse>({
    url: '/api/collections/0w865dit1pss844/records',
    method: 'get',
    params: {
      page: queryParams.page,
      perPage: 999,
      sort: queryParams.sort,
      filter: filterCondition,
    },
  });
}

/**
 * 获取商品价格
 */
export function goodsPrice(data?: Recordable) {
  return request({
    url: `/shop/goods/price`,
    method: 'post',
    data,
  });
}

/**
 * 读取商品的按天定价数据列表
 */
export function goodsPriceDay(data?: Recordable) {
  return request({
    url: `/shop/goods/price/day`,
    method: 'get',
    params: data,
  });
}

/**
 * 获取商品的会员折扣
 */
export function goodsRebate(data?: Recordable) {
  return request({
    url: `/shop/goods/rebate/v2`,
    method: 'get',
    params: data,
  });
}

/**
 * 获取商品评价列表
 */
export function goodsReputation(data?: Recordable) {
  return request({
    url: `/shop/goods/reputation/v2`,
    method: 'post',
    data,
  });
}

export default {
  goodsSeckillGrab,
  goodsVisitLog,
  goodsVisitLogAdd,
  goodsVisitLogClear,
  goodsVisitLogDelete,
  goodsBrandDetail,
  goodsBrandFavAdd,
  goodsBrandFavCheck,
  goodsBrandFavDelete,
  goodsBrandFavList,
  goodsBrandList,
  goodsCategoryAll,
  goodsCategoryInfo,
  goodsDel,
  goodsDetail,
  goodsFavAdd,
  goodsFavCheck,
  goodsFavDelete,
  goodsFavList,
  goodsGoodsAddition,
  goodsHisDelete,
  goodsHisList,
  goodsLimitation,
  goodsList,
  goodsPrice,
  goodsPriceDay,
  goodsRebate,
  goodsReputation,
};
