<template >
  <!-- v-if="pageReady" -->
  <!-- <div class="settings-screen"> -->
  <slot name="loader" v-if="isLoading">
    <loader :message="'Loading orders'" :type="'large'" :color="LARGE_LOADER_COLOR"></loader>
  </slot>
  <slot v-else>

    <header>
      <span class="title">
        Reporting / Orders
      </span>

      <button class="button is-primary" style="margin-right: 2.8rem;" @click="openCreateModal">
        <Plus_Icon class="nav_icon" />
        New order
      </button>
    </header>



    <div class="filters">
      <div class="filter-wrapper">
        <p>Shipped country:</p>
        <!--  -->
        <select id="select" v-model="filteredCountry">
          <option value="all">All countries</option>
          <option v-for="(country, i) in countries" :key="i" :value="country">
            {{ country }}</option>
        </select>
      </div>
      <div class="filter-wrapper">
        <p>Shipped city:</p>
        <!-- v-model="selectedService" id="select" -->
        <select v-model="filteredCity">
          <option value="all">All cities</option>
          <option v-for="(city, i) in cities" :key="i" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
      <div class="filter-wrapper">

        <p>Search:</p>
        <input type="text" placeholder="Search on values" v-model="search" @keyup.enter="filterList" />

      </div>
      <div class="filter-wrapper">
        <p>Filter:</p>
        <button class="refresh_button" @click="filterList">Filter</button>
      </div>
      <div class="filter-wrapper">
        <p>Refresh:</p>
        <button class="refresh_button" @click="refreshList">Refresh</button>
      </div>
    </div>

    <!-- after creating table -->
    <create-order-modal v-if="isCreateModalVisible" @close-modal="closeModal" @update-list="updateList">
    </create-order-modal>

    <!-- after creating create order modal -->
    <confirm-delete-modal v-if="isDeleteModalVisible" :entity-type="ENTITY_TYPE" :entity-title="entityTitle"
      @close-modal="closeModal" @handle-delete="handleDeleteRecord">
    </confirm-delete-modal>


    <!-- after creating create order modal -->
    <edit-order-modal v-if="isEditModalVisible" @close-modal="closeModal" :shipped-name="shippedName"
      :shipped-address="shippedAddress" :shipped-city="shippedCity" :shipped-country="shippedCountry"
      :shipped-postal-code="shippedPostalCode" @handle-edit="handleEditRecord">
    </edit-order-modal>

    <div class="body">
      <h3>System loaded {{ orders?.length }} orders</h3>



      <!-- <td class="table-actions">
                <div class="icon-wrapper">

                  <Edit_Icon class="action-icon" @click="openEditModal(item.id, item.shipped_name, item.shipped_address, item.shipped_city,
                    item.shipped_postal_code, item.shipped_country)" />
                  <span class="tooltiptext">Edit</span>
                </div>
                <div class="icon-wrapper">
                  <Trash_Icon class="action-icon" @click="() => openDeleteModal(item.id, item.id)" />
                  <span class="tooltiptext">Delete</span>
                </div>
              </td> -->
      <span>

        <table>
          <thead>
            <tr>
              <!-- Only add icons in sorting lesson -->
              <th class="table-actions" @click=sortingByDate(ORDERBYID)>
                ID 
                <Sorting_Icon class="sorting-icon"
                  :class="orderBy === 'id' ? 'active-sorting' : ''"/>
              </th>
              <th @click=sortingByDate(ORDERBYDATE)>Order date<Sorting_Icon class="sorting-icon"
                  :class="orderBy === 'order_date' ? 'active-sorting' : ''"/>
              </th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Required Date</th>
              <!-- <th>Shipped Date</th> -->
              <!-- <th>Shipped Via</th> -->
              <th>Shipped Name</th>
              <th>Shipped Address</th>

              <th>Shipped Postal Code</th>
              <th>Shipped City</th>
              <!-- <th>Shipped Region</th> -->
              <th>Shipped Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- @click="openDetails() -->
            <tr v-for="(item, i) in orders" :key="i">

              <td @click=openDetails(item)>{{ item.id }}</td>
              <td @click=openDetails(item)>{{ formatDate(item.order_date) }}</td>
              <td @click=openDetails(item)>{{ item.customer.last_name }}</td>
              <td @click=openDetails(item)>{{ item.product.product_name }}</td>
              <td @click=openDetails(item)>{{ formatDate(item.required_date) }}</td>
              <td @click=openDetails(item)>{{ item.shipped_name }}</td>
              <td @click=openDetails(item)>{{ item.shipped_address }}</td>
              <td @click=openDetails(item)>{{ item.shipped_postal_code }}</td>
              <td @click=openDetails(item)>{{ item.shipped_city }}</td>
              <td @click=openDetails(item)>{{ item.shipped_country }}</td>
              <td class="table-actions">
                <div class="icon-wrapper">

                  <Edit_Icon class="action-icon" @click="openEditModal(item.id, item.shipped_name, item.shipped_address, item.shipped_city,
                    item.shipped_postal_code, item.shipped_country)" />
                  <span class="tooltiptext">Edit</span>
                </div>
                <div class="icon-wrapper">
                  <Trash_Icon class="action-icon" @click="() => openDeleteModal(item.id, item.id)" />
                  <span class="tooltiptext">Delete</span>
                </div>
              </td>



            </tr>
          </tbody>
        </table>
      </span>

      <!-- {{ perPage }} -->
      <!-- @reset-tab="resetTabs" -->

      <pagination v-if="count > 0" :current-page="currentPage" :per-page="perPage" :is-tab-changed="isTabChanged"
        :number-of-pages="numberOfPages" :count="count" @update-page="updatePage" @update-table-size="updateTableSize">
      </pagination>
      <div v-else class="no-records">
        <h2>
          No records found!
        </h2>
      </div>
    </div>
  </slot>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Loader from '@/components/common/Loader.vue';

import { deleteRecordFromOrders, editRecordInOrders, loadOrders } from '@/api/reporting';


import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Search_Icon from '@/assets/icons/Search_Icon.vue';
import { IOrder } from '@/models/IOrder';

import Pagination from '@/components/common/Pagination.vue';


import CreateOrderModal from '../modals/CreateOrderModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import EditOrderModal from '../modals/EditOrderModal.vue';
import router from '@/router';
import { formatDate } from '@/composables/util'
import { extractValues } from '@/composables/util'

import { loadCountries } from '@/api/common';
import { loadCities } from '@/api/common';

import { LARGE_LOADER_COLOR } from '@/constants/colors'

export default defineComponent({
  components: {
    CreateOrderModal,
    ConfirmDeleteModal,
    EditOrderModal,

    Loader,

    Search_Icon,
    Edit_Icon,
    Pagination,
    Plus_Icon,
    Sorting_Icon,
    Trash_Icon
  },
  setup() {

    // === for sorting ===

    const ORDERBYID = 'id'
    const ORDERBYDATE = 'order_date'

    const isLoading = ref(false)


    let assignPage = ref();

    let currentPage = ref(
      assignPage.value === undefined ? 1 : assignPage.value
    );

    let isTabChanged = ref<boolean>(false);
    const updateRange = () => {
      currentPage.value = 1;
      updateList();
    };



    // const numberOfPages = ref(0)

    const numberOfPages = computed(() => {
      const data = store.getters['orderManagement/getNumberOfPages'];
      // console.log('orderManagement/getNumberOfPages _________________', data);

      return Number(data);
    });

    // const getNumberOfPages = () => {
    //   const data = store.getters['orderManagement/getNumberOfPages'];
    //   console.log('orderManagement/getNumberOfPages _________________', data);
    //   numberOfPages.value = data
    //   // return numberOfPages.value

    //   // return Number(data);
    // };

    // let maxPagesShown = ref();
    let perPage = ref(5);

    // const pagesShown = computed(() => {
    //   return maxPagesShown.value <= numberOfPages.value - currentPage.value
    //     ? maxPagesShown.value
    //     : numberOfPages.value - currentPage.value + 1;
    // });

    const count = computed(() => {
      const data = store.getters['orderManagement/getCount'];
      // console.log('orderManagement/getCount in OrdersView +++++++++', data);

      return Number(data);
    });

    const updatePage = (page: number) => {
      // if (page <= 0 || page > numberOfPages.value) return;
      // console.warn('tab is updated!')

      currentPage.value = page;
      updateList();
    };

    const updateTableSize = (pageSize: any) => {
      perPage.value = pageSize.value;
      updateList();
      updateRange();
    };

    // const resetTabs = () => {
    //   console.log('tab is changed');
    //   alert('tab is changed!')
    //   isTabChanged.value = false;
    // };

    const filterList = () => {
      // updatePage(1) // added for items number update
      updateList()
    }



    const cities = ref();
    const countries = ref();

    const getCities = async () => {
      let data: any = await loadCities();
      cities.value = extractValues(data);
    }

    const getCountries = async () => {
      let data: any = await loadCountries();
      countries.value = extractValues(data);;
    }

    const store = useStore();

    const isCreateModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isEditModalVisible = ref(false);


    const ENTITY_TYPE = 'order with ID ';
    const entityTitle = ref()


    const orderIdToDelete = ref('');

    const orderIdToUpdate = ref('');

    const closeModal = () => {


      isCreateModalVisible.value = false;
      isDeleteModalVisible.value = false;
      isEditModalVisible.value = false;

      orderIdToDelete.value = '';

    };

    const shippedName = ref('');
    const shippedPostalCode = ref('');
    const shippedCountry = ref('');
    const shippedCity = ref('');
    const shippedAddress = ref('');

    const setDataForDetailsPage = (item: IOrder) => {
      return store.dispatch('orderManagement/setOrderDetails', {
        ...item,
      });
    };

    const openDetails = (item: IOrder) => {
      let id = item.id

      setDataForDetailsPage(item);

      router.push({
        name: 'order-details',
        params: {

          id,

        }
      })
      // console.log('going to details');

    }

    // option: string, id: number, type: string
    const openEditModal = (id: string, name: string, address: string, city: string, postalCode: string, country: string) => {
      shippedName.value = name;
      shippedAddress.value = address;
      shippedCity.value = city;
      shippedPostalCode.value = postalCode;
      shippedCountry.value = country;
      orderIdToUpdate.value = id;

      isEditModalVisible.value = true;

    }

    const openDeleteModal = (id: string, title: string) => {
      entityTitle.value = title;
      isDeleteModalVisible.value = true;
      orderIdToDelete.value = id;

      // console.log('should open delete now?', isDeleteModalVisible.value)
    };

    const handleDeleteRecord = () => {
      isDeleteModalVisible.value = false;
      //test your catch with
      // deleteRecordFromOrders('15')
      deleteRecordFromOrders(orderIdToDelete.value)
        .then(() => {
          updateList();
        })
        .catch((error) => console.log(error))

      //   showNotice({
      //     props: {
      //       type: 'success',
      //       duration: 5000,
      //       message: `Successfully deleted a record`,
      //     },
      //   });
      // });
    };
    const handleEditRecord = (editedOrder: any) => {
      isEditModalVisible.value = false;



      editRecordInOrders(
        orderIdToUpdate.value,
        editedOrder)
        // .then(() => {
        //   showNotice({
        //     props: {
        //       type: 'success',
        //       duration: 5000,
        //       message: `Successfully updated description`,
        //     },
        //   });
        // })
        .then(() => {
          closeModal();
          updateList();
          orderIdToUpdate.value = '';
        })
        .catch(err => console.log(err)
        );
    };



    // const orders = ref();
    const orders = computed(() => {
      let data = store.getters['orderManagement/getOrders'];
      // console.log('debugging data... ', data);

      if (!data) return

      return data;
    });

    const filteredCountry = ref('');
    const filteredCity = ref('');
    const search = ref('');

    const orderBy = ref('id')

    const updateList = async () => {

      // ====== and this is now obsolete for we are using the store
      // // this is just because of pagination, originaly do the one line only
      // let data: any = await loadOrders();
      // orders.value = data.results;

      isLoading.value = true

      return Promise.allSettled([
        store.dispatch('orderManagement/setOrders', {
          filteredCountry: filteredCountry.value,
          filteredCity: filteredCity.value,
          search: search.value,
          per_page: perPage.value,
          page: currentPage.value,
          // add in sorting lesson
          order_by: orderBy.value
        }).then(() => {
          isLoading.value = false
        }),

      ]);
    }

    // console.log('**************** sorting after click >>> ', orderBy.value);
    const sortingByDate = async (ordering: string) => {
      await store.dispatch('orderManagement/setSorting', ordering);
      orderBy.value = store.getters['orderManagement/getSorting'];
      updateList()
    };



    const refreshList = () => {
      filteredCountry.value = '';
      filteredCity.value = '';
      search.value = '';
      updateList()
    }

    const openCreateModal = () => {
      // console.log('opened');

      isCreateModalVisible.value = true;

    };

    // const closeDropdown = () => {
    //   // console.log('closed dropdown');
    //   // closeModal()
    // };



    onMounted(() => {
      updateList()
      getCities()
      getCountries()
    })

    // updateList()

    // getNumberOfPages()

    // getCities()
    // getCountries()

    // updateList()
    // getCities()
    // getCountries()
    // getNumberOfPages()

    return {
      // for sorting constants::

      LARGE_LOADER_COLOR,

      ORDERBYID,
      ORDERBYDATE,
      orderBy,
      // pageReady,
      currentPage,
      isTabChanged,
      count,
      numberOfPages,
      // resetTabs,
      updatePage,
      updateTableSize,

      // maxPagesShown,
      // pagesShown,

      isLoading,

      ENTITY_TYPE,
      entityTitle,

      cities,
      countries,

      isCreateModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,

      orders,
      perPage,

      filteredCountry,
      filteredCity,
      search,
      // const ruleId = ref<number>();

      shippedName,
      shippedAddress,
      shippedCity,
      shippedCountry,
      shippedPostalCode,

      // closeDropdown,
      openDetails,
      refreshList,

      sortingByDate,

      closeModal,
      filterList,
      formatDate,
      openEditModal,
      handleDeleteRecord,
      handleEditRecord,
      openDeleteModal,
      openCreateModal,
      updateList
    }
  }
})
</script>

<style lang="scss" scoped>
.no-records {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  font-size: x-large;
  color: red;
}

.sorting-icon {

  vertical-align: -5px;
  margin-left: 5px;


}

.active-sorting {
  border-radius: 50%;
  background-color: $color-acitive;
  padding-left: 2px;
}

</style>