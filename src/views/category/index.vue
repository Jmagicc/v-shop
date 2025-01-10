<script lang="ts">
export default {
  name: 'Category',
};
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref, unref } from 'vue';
import API_GOODS from '@/apis/goods';
import IMAGE_LIST_EMPTY from '@/assets/images/empty/good.png';
import dayjs from 'dayjs';

// 定义分类数据接口
interface CategoryItem {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  name: string;
  icon: string;
  updated: string;
  text?: string; // 用于兼容原有逻辑
}

onMounted(() => {
  getCategoryList();
});

const router = useRouter();

const categoryIndex = ref(0);
const categoryList = ref<CategoryItem[]>([]);

function onCategoryChange() {
  console.log('分类切换:', categoryIndex.value);
  // 重置分页
  pagination.pageCurrent = 1;
  // 清空现有数据
  list.value = [];
  // 刷新列表
  listRef.value?.refresh();
}

function getCategoryList() {
  API_GOODS.goodsCategoryAll().then((res) => {
    console.log('Category response:', res); // 添加日志查看响应数据
    if (res.data?.items?.length) {
      categoryList.value = res.data.items.map((item: CategoryItem) => ({
        ...item,
        text: item.name,
        created: dayjs(item.created).format('YYYY-MM-DD HH:mm'),
        updated: dayjs(item.updated).format('YYYY-MM-DD HH:mm')
      }));
      
      // 确保有数据后再调用 loadData
      if (categoryList.value.length > 0) {
        listRef.value?.loadData();
      }
    }
  }).catch(error => {
    console.error('Failed to fetch categories:', error);
  });
}

const listRef = ref<any>(null);
const list = ref<Recordable[]>([]);
const pagination = reactive({
  pageCurrent: 1,
  pageSize: 10,
});
const listMeta = reactive({
  loadingText: '努力加载中...',
  emptyText: '暂无商品',
  emptyImage: IMAGE_LIST_EMPTY,
});

const fieldNames = {
  itemsField: 'items',
  totalRowField: 'totalItems'
};

const loading = ref(false);

const getGoodList = async () => {
  try {
    // 确保有分类数据
    if (!categoryList.value.length) {
      return {
        success: true,
        data: {
          items: [],
          totalItems: 0
        }
      };
    }

    const currentCategory = unref(categoryList.value)[categoryIndex.value];
    const params = {
      categoryId: currentCategory.name,
      page: pagination.pageCurrent,
      pageSize: pagination.pageSize,
    };

    const res = await API_GOODS.goodsList(params);
    console.log('API response:', res);

    // 检查响应数据
    if (!res || !res.data) {
      return {
        success: false,
        data: {
          items: [],
          totalItems: 0
        }
      };
    }

    // 转换数据格式以适配现有的展示逻辑
    const formattedData = res.data.items.map(item => ({
      id: item.id,
      product_name: item.product_name,
      main: item.main? `${import.meta.env.VITE_APP_API_BASE_URL}/api/files/0w865dit1pss844/sztopnd9n4qkygn/${item.main}` : '',
      actual_price: Number(item.actual_price),
      wholesale_price: Number(item.wholesale_price),
      description: item.description,
      stock_quantity: item.stock_quantity,
      recommendStatus: item.recommendStatus,
      origin_price: Number(item.origin_price)
    }));

    return {
      success: true,
      data: {
        items: formattedData,
        totalItems: res.data.totalItems || formattedData.length
      }
    };
  } catch (error) {
    console.error('Failed to fetch goods:', error);
    return {
      success: false,
      data: {
        items: [],
        totalItems: 0
      }
    };
  }
};

function onGoodClicked(id: number) {
  router.push({ path: '/good/detail', query: { id } });
}
</script>

<template>
  <div class="container">
    <div class="main">
      <van-sidebar v-model="categoryIndex" class="sidebar" @change="onCategoryChange">
        <van-sidebar-item 
          v-for="item in categoryList" 
          :key="item.id"
          :title="item.name"
        >
          <!-- 添加图标显示 -->
          <template #icon>
            <van-icon :name="item.icon" />
          </template>
          <!-- 可选：显示描述信息 -->
          <template #desc>
            {{ item.description }}
          </template>
        </van-sidebar-item>
      </van-sidebar>
      <div class="right-content scroller-y">
        <ProList
          ref="listRef"
          v-model:dataSource="list"
          mode="infinite"
          :api="getGoodList"
          :pagination="pagination"
          :meta="listMeta"
          :fieldNames="fieldNames"
          :immediate="true"
          :loading="loading"
        >
          <div class="list">
            <div v-for="item in list" :key="item.id" class="list-col">
              <div class="list-item" @click="onGoodClicked(item.id)">
                <van-image 
                  class="list-item-photo" 
                  :src="item.main" 
                  :alt="item.product_name"
                  fit="cover"
                  error-icon="photo-fail"
                  loading-icon="photo"
                />
                <div class="list-item-info">
                  <div class="list-item-title">{{ item.product_name }}</div>
                  <div class="list-item-price">
                    <div class="price">
                      <div class="price-current">
                        <span class="price-current-symbol">¥</span>
                        <span class="price-current-integer">{{ item.actual_price }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ProList>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <Tabbar />
  </div>
</template>
<style lang="less" scoped>
.main {
  height: calc(100vh - 50px - var(--safe-area-height-bottom));
  display: flex;
}

.sidebar {
  // margin-right: 10px;
  width: 100px;
  height: 100%;
  background-color: var(--color-bg-1);
}

.right-content {
  flex: 1;
  background: var(--color-bg-2);
}

.list {
  display: flex;
  flex-wrap: wrap;

  &-col {
    width: 50%;
    box-sizing: border-box;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 10px;
  }

  &-item {
    position: relative;
    overflow: hidden;

    &-photo {
      display: flex;
      width: 100%;
      height: 127px;
    }

    &-info {
      padding: 5px 0;
    }

    &-title {
      font-size: 14px;
      color: var(--color-text-1);
      min-height: 36px;
      line-height: 18px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &-price {
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .buy-btn {
      height: 24px;
      padding: 0 8px;
      line-height: 24px;
    }

    .price {
      display: flex;
      align-items: center;

      &-current {
        margin-right: 5px;
        color: var(--color-primary);

        &-symbol {
          font-size: 12px;
          margin-right: 2px;
        }

        &-integer {
          font-size: 18px;
          font-family: @font-family-price-integer;
        }
      }

      &-origin {
        font-size: 12px;
        text-decoration: line-through;
        color: var(--color-text-3);

        &-label {
          margin-right: 2px;
        }

        &-integer {
          text-decoration: line-through;
          font-family: @font-family-price-integer;
        }
      }
    }
  }
}
</style>

