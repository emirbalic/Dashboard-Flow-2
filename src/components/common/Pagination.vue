<template>
  <!--v-if="pageReady" -->
  <div class="statistics" >
    <div class="container">
      <!-- 
          <div> pageReady {{ pageReady }}</div>
        -->

      <!-- <div> numberOfPages {{ numberOfPages }}</div>
      <div> currentPage {{ currentPage }}</div>
      <div> leftDistance {{ leftDistance }}</div>
      <div> rightDistance {{ rightDistance }}</div>
      <div> count {{ count }}</div>
      <div> perPage {{ perPage }}</div> -->

      <div class="triple footer" :count="count">

        <div>
          <span v-if="count > 0">
            Showing {{ (currentPage - 1) * perPage + 1 }} to
            {{
              currentPage * perPage < count ? currentPage * perPage : count }} out of {{ count }} results </span>
              <span v-else> No results </span>
        </div>

        <div>
          <!-- first is ok -->
          <span v-if="currentPage - 1 > 0" @click="
            updatePage(1);
          // calculateLeftDistance(currentPage);
          calculateDistances('first')

            " class="pageList">First </span>

          <!-- LEFT -->
          <!-- page, -->
          <span v-for="( i) in leftDistance" :key="i" class="pageList" @click="
            updatePage(currentPage - (leftDistance - (i - 1)));
          // calculateLeftDistance(currentPage);
          calculateDistances('left');
          ">
            <!-- {{ currentPage - (leftDistance - i) }} left i={{ i+2 }} -->
            <!-- <span v-if="currentPage - (leftDistance) !== -1">

            </span> -->
            <!-- {{ currentPage - (i) }}  -->
            {{ currentPage - (leftDistance - (i - 1))  }} 
            <!-- {{ i + 1 }} -->
            <!-- = left  -->
            <!-- i={{ i }} -->
          </span>



          <span class="currentPage selectedPage">Page {{ currentPage }}</span>


          <!-- RIGHT -->
          <span  @click="
            updatePage(currentPage + i);
          // calculateLeftDistance(currentPage);
          calculateDistances('right');
          " v-for="( i ) in (rightDistance ) " :key="i" class="pageList">
           

              {{ currentPage + i }} 
           
          
          </span>


          <!-- last is ok -->
          <span v-if="currentPage != numberOfPages" 
          @click="
            updatePage(numberOfPages);
          // currentPage
          calculateDistances('last');  // this one is good
          " class="pageList">Last</span>

        </div>

        <div>
          <span class="small">Items per page:</span>
          <select v-model="perPage" @change="updateTableSize">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="30">30</option>
            <!-- <option :value="25">25</option> -->
          </select>
        </div>

      </div>
    </div>
  </div>
  <!-- </container> -->
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref, watch } from 'vue';

import { useStore } from 'vuex';
// import Container from '@/components/common/Container.vue';
import { IPaginationDetailedInfo } from '@/models/IUtilModels';


export default defineComponent({

  emits: ['reset-tab', 'update-page', 'update-table-size'],

  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    // isTabChanged: {
    //   type: Boolean,
    //   required: true,
    // },
    count: {
      type: Number,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useStore();

    const numberOfPages = ref(props.numberOfPages)
    const leftDistance = ref(0);
    const rightDistance = ref(numberOfPages.value - 2);
    // const rightDistance = ref(9)
    const perPage = ref(props.perPage);

    // console.log("numberOfPages", props.numberOfPages);
    // console.log("rightDistance after init", rightDistance.value);


    const count = computed(() => {
      // console.log("count in pagination ?????", props.count);
      return props.count;
    });


    let paginationDistance: IPaginationDetailedInfo;

    // let perPage = computed(() => {
    //   return props.perPage;
    // });

    // let currentPage  = ref(props.currentPage);

    // let initCurrentPage = computed(() => {
    //   currentPage.value = props.currentPage;
    //   return currentPage.value
    //   // return props.currentPage;
    // });

    // let initCurrentPage = ref(0);

    let currentPage = computed(() => {
      // initCurrentPage.value = props.currentPage;
      // return initCurrentPage.value
      return props.currentPage;
    });


    // let isTabChanged = computed(() => {
    //   return props.isTabChanged;
    // })




    // const setDistance = async () => {
    //   let distanceInfoFromStore = await store.getters[
    //     'orderManagement/getPaginationDistance'
    //   ];
    //   // console.log('in setDistance', distanceInfoFromStore);

    //   if (distanceInfoFromStore !== undefined) {
    //     leftDistance.value = distanceInfoFromStore.leftDistance;
    //     rightDistance.value = distanceInfoFromStore.righDistance;
    //   }
    // }

    // watch(
    //   () => props.isTabChanged,
    //   () => {
    //     if (isTabChanged) {
    //       // alert('changing tabs')
    //       leftDistance.value = leftDistance.value;
    //       rightDistance.value = rightDistance.value;
    //       resetTabs();
    //     }
    //   }
    // );




    const calculateDistances = async (position: string) => {
      // console.log('position from >> ', position);
      
      let current = Number(currentPage);
      // console.log('currentPage >> ', current);
      // console.log('numberOfPages >> ', numberOfPages.value);


      if (numberOfPages.value === current) {
        // alert('here')
        rightDistance.value = 0;
        leftDistance.value = numberOfPages.value - 2;
      } else {
        rightDistance.value = (numberOfPages.value - 1) - current
        if (position === 'right') {
          leftDistance.value = current - 2;
        }
        else if (position === 'left') {
          // 
          // alert( current)
          leftDistance.value =  current - 2;
        } else if (position === 'first') {
          leftDistance.value = 0;
        } 
  

      }
      await setDistanceToStore();
    };


    const resetTabs = () => {
      alert('reseting tab')
      emit('reset-tab', false);
    }

    const setDistanceToStore = async () => {
      // console.log(page);

      paginationDistance = {
        leftDistance: leftDistance.value,
        righDistance: rightDistance.value,
      };

      await store.dispatch(
        'orderManagement/setPaginationDistance',
        paginationDistance
      );
    };

    const updatePage = (page: any) => {
      // console.log('currentPage in update page >>> ', page);

      if (page <= 0 || page > numberOfPages.value) return;
      // store.dispatch('orderManagement/setPageNumber', page);
      emit('update-page', page);
      currentPage = page;
    };

    const updateTableSize = async () => {
      //
      // console.log('per page', perPage.value);

      // console.log('number of pages now', Math.ceil(count.value/ perPage.value));
      // currentPage.value = 1
      // 

      if(count.value < perPage.value) { // ==== to protect, add after everything
        alert('Not permited operation')
      } else {

        numberOfPages.value = Math.ceil(count.value/ perPage.value)
  
        leftDistance.value = 0;
        rightDistance.value = numberOfPages.value - 2;
  
        await store.dispatch(
          'orderManagement/setNumberOfPages',
          paginationDistance
        );
        
  
        emit('update-table-size', perPage);
        updatePage(1)
      }

    };
    // const updateDistances = async () => {
    //   //
    //   console.log('per page', perPage.value);
      
    //   leftDistance.value = 0;
    //   rightDistance.value = 5;

    //   emit('update-table-size', perPage);
    // };

    onMounted(() => {
      // console.log('it is now');
      let nr = store.getters[
        'orderManagement/getNumberOfPages'
      ];
      // console.log('it is now', nr);


    })

    // setDistance();
    // console.log("rightDistance before return", rightDistance.value);

    return {
      count,
      leftDistance,
      currentPage,
      numberOfPages,
      perPage,
      rightDistance,

      // pageReady,
      // initialNumberOfPages,

      // calculateLeftDistance,
      calculateDistances,
      resetTabs,
      updatePage,
      updateTableSize,
    };
  },
});
</script>

<style lang="scss" scoped >
.statistics {
  .container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 24px;
    // width: 98%;

    // .content {
    //   position: relative;
    //   height: 244px;
    //   width: 1fr;
    //   padding: 24px;
    //   box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
    //   border-radius: 4px;
    // }


    .triple {
      grid-column: span 3;
    }


    .footer {
      margin: 40px 50px 0 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      font-family: "IBM Plex Sans", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #2d4059;

  

      select {
        margin-top: -10px;
        margin-left: 10px;
        padding: 10px;
      }

      .pageList,
      .currentPage {
        border: 1px solid #2d4059;
        padding: 5px 10px;
        user-select: none;
      }

      .pageList:hover {
        cursor: pointer;
      }

      .selectedPage {
        opacity: 1;
        pointer-events: none;
      }

      .small {
        font-size: 12px;
      }
    }

  }
}
</style>

