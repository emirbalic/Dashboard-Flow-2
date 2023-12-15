<template>
    <div class="default-layout">
        <!-- class="scrollable" -->
        <aside >
            <header class="logo">
                <img :style="{ height: '40%', width: '20%' }" src="@/assets/logo.png" />

                <h2>Reports</h2>

            </header>
            <nav>

                <section class="product-nav">
                    <!-- <section :to="{ name: 'dashboard' }" class="is-data" :class="{
                        'single': routeProduct === 'dashboard'
                    }">
                        <a @click.prevent="defaultLink()">
                            <Home_Icon class="nav_icon" />
                            <span>Home</span>
                        </a>
                    </section> -->


                    <div class="section-title">DASHBOARDS</div>

                    <section class="is-data" :class="{
                        'is-toggled': toggledProducts.includes('reporting'),
                        'is-active': routeProduct === 'reporting',
                    }">
                    <!-- top -->
                        <a href="#" @click.prevent="toggleProduct('reporting')">
                            <Calls_Icon :color="colorKey === 'reporting' ? activeColor : baseColor" class="nav_icon" />
                            <span>Reporting</span>
                            <MenuToggle_Icon class="menuToggle" />
                        </a>
                        <div class="subs">
                          <router-link :to="{ name: 'orders' }"
                                :class="{ 'router-link-exact-active': checkURL('orders') }" class="each">
                                Orders 
                            </router-link>
                              <router-link :to="{ name: 'products' }"
                                :class="{ 'router-link-exact-active': checkURL('products') }" class="each">
                                Products
                            </router-link>
                            <!-- <router-link :to="{ name: 'suppliers' }"
                                :class="{ 'router-link-exact-active': checkURL('suppliers') }" class="each">
                                Suppliers
                            </router-link>  -->

                        </div>
                    </section>

                    <section class="is-data" :class="{
                        'is-toggled': toggledProducts.includes('callers-report'),
                        'is-active': routeProduct === 'callers-report',
                    }">

                        <a href="#top" @click.prevent="toggleProduct('callers-report')">
                            <Callers_Icon :color="colorKey === 'callers-report' ? activeColor : baseColor" class="nav_icon" />
                            <span>Customers</span>
                            <MenuToggle_Icon class="menuToggle" />
                        </a>
                        <div class="subs">
                            <router-link :to="{ name: 'customers' }"
                                :class="{ 'router-link-exact-active': checkURL('customers') }" class="each">
                                Customers
                            </router-link>
                            <!-- <router-link :to="{
                                name: 'callers-report',
                                params: {
                                    service: 'All',
                                    country: 'All'
                                }
                            }" :class="{ 'router-link-exact-active': checkURL('callers-report') }" class="each">
                                Report
                            </router-link>
                            <router-link :to="{ name: 'callers-inspect' }"
                                :class="{ 'router-link-exact-active': checkURL('callers-inspect') }" class="each">
                                Inspect
                            </router-link> -->
                        </div>
                    </section>

                    <!-- <section class="is-data" :class="{
                        'is-toggled': toggledProducts.includes('detection-simulate'),
                        'is-active': routeProduct === 'detection-simulate',
                    }">
                        <a href="#top" @click.prevent="toggleProduct('detection-simulate')">
                            <Target_Icon :color="colorKey === 'detection-simulate' ? activeColor : baseColor" class="nav_icon" />
                            <span>Detection</span>
                            <MenuToggle_Icon class="menuToggle" />
                        </a>
                        <div class="subs">
                            <router-link :to="{ name: 'detection-reports' }"
                                :class="{ 'router-link-exact-active': checkURL('detection-reports') }" class="each">
                                Reports
                            </router-link>
                            <router-link :to="{ name: 'detection-insights' }"
                                :class="{ 'router-link-exact-active': checkURL('detection-insights') }" class="each">
                                Insights
                            </router-link>
                            <router-link :to="{ name: 'detection-simulate' }"
                                :class="{ 'router-link-exact-active': checkURL('detection-simulate') }" class="each">
                                Simulate
                            </router-link>
                        </div>
                    </section> -->

                  
                

               

                  

                </section>

              
            </nav>
        </aside>
        <main class="body">
      <router-view :key="route.path"></router-view>
    </main>
    </div>
</template>
<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

// import {
//     remove as removeFromStore,
//     get as getFromStore,
// } from '@/services/store';

import api from '../api/api';
// import Config_Icon from '@/components/icons/Config_Icon.vue';
// import Settings_Icon from '@/components/icons/Settings_Icon.vue';
// import User_Icon from '@/components/icons/User_Icon.vue';
import Home_Icon from '@/assets/icons/Home_Icon.vue';
// import Home_Icon from '@/components/icons/Home_Icon.vue';

import MenuToggle_Icon from '@/assets/icons/MenuToggle_Icon.vue';
// import Users_Icon from '@/components/icons/Users_Icon.vue';
import Callers_Icon from '@/assets/icons/Callers_Icon.vue';
// import Target_Icon from '@/components/icons/Target_Icon.vue';
import Calls_Icon from '@/assets/icons/Calls_Icon.vue';



export default defineComponent({
      components: {
        Calls_Icon,
        Callers_Icon,
    //     Config_Icon,
        Home_Icon,
        MenuToggle_Icon,
    //     Settings_Icon,
    //     Target_Icon,
    //     User_Icon,
    //     Users_Icon,
      },
    setup() {
        // const logout = () => {

        //   removeFromStore('auth');
        //   api.cancel();
        //   router.push({
        //     name: 'dashboard',
        //   });
        // };
        const route = useRoute();

        const activeColor = ref('#0fadd4')
        const baseColor = ref('white')
        const colorKey = ref('')

        // const isAllowed = computed(() => getFromStore('auth.isAllowed') || false);
        // const isAdmin = computed(() => getFromStore('auth.isAdmin') || false);

        // const loggedUser = computed(() => getFromStore("auth.username") || "Not logged");

        const isCompact = computed(
            //   () => getFromStore('settings.hasCompactMenu') || false
            () => true
        );

        const toggledProducts = ref(
            [isCompact.value ? null : router.currentRoute.value.meta.product].filter(
                Boolean
            )
        );

        const routeProduct = computed(() => router.currentRoute.value.meta.product);

        const defaultLink = () => {
            router.push({
                name: 'default',
            })
        };

        const toggleProduct = (key: string) => {
            toggledProducts.value = [key];
            colorKey.value = key;
        };

        const checkURL = (path: string) => {
            return route.path.includes(path)
        };


        return {
            activeColor,
            baseColor,
            colorKey,

            //   isAllowed,
            //   isAdmin,
            //   isCompact,
            //   loggedUser,

            routeProduct,
            route,
            toggledProducts,

            checkURL,
            defaultLink,
            //   logout,
            toggleProduct,  // --> NAMING SUGGESTION SWITCH VIEW <--

        };
    },
});
</script>

<style scoped lang="scss">

</style>
