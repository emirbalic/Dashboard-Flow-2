<template>
    <div class="default-layout">
        <!-- class="scrollable" -->
        <aside>
            <header class="logo">
                <img :style="{ height: '40%', width: '20%' }" src="@/assets/logo.png" />

                <h2>Reports</h2>

            </header>
            <nav>

                <section class="product-nav">
                    <!-- <section :to="{ name: 'dashboard' }" class="is-data" :class="{
                        'single': routeScreen === 'dashboard'
                    }">
                        <a @click.prevent="defaultLink()">
                            <Home_Icon class="nav_icon" />
                            <span>Home</span>
                        </a>
                    </section> -->


                    <div class="section-title">DASHBOARDS</div>

                    <section class="is-data" :class="{
                        'is-toggled': toggledScreens.includes('reporting'),
                        'is-active': routeScreen === 'reporting',
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
                        'is-toggled': toggledScreens.includes('customers'),
                        'is-active': routeScreen === 'customers',
                    }">

                        <a href="#top" @click.prevent="toggleProduct('customers')">
                            <Callers_Icon :color="colorKey === 'customers' ? activeColor : baseColor"
                                class="nav_icon" />
                            <span>Customers</span>
                            <MenuToggle_Icon class="menuToggle" />
                        </a>
                        <div class="subs">
                            <router-link :to="{ name: 'customers' }"
                                :class="{ 'router-link-exact-active': checkURL('customers') }" class="each">
                                Customers
                            </router-link>
                        </div>
                    </section>

                 


                </section>

                <!-- -->
                <section class="bottom-nav">
                    <a @click.prevent="logout">
                        <Logout_Icon class="nav_icon" />
                        <span style="margin-left: 9px;">Log out {{ loggedUser[0].toUpperCase() + loggedUser.slice(1) }}</span>
                    </a>
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

// import api from '../api/api';
// import Config_Icon from '@/components/icons/Config_Icon.vue';
// import Settings_Icon from '@/components/icons/Settings_Icon.vue';
// import Logout_Icon from '@/components/icons/Logout_Icon.vue';
import Home_Icon from '@/assets/icons/Home_Icon.vue';
// import Home_Icon from '@/components/icons/Home_Icon.vue';

import MenuToggle_Icon from '@/assets/icons/MenuToggle_Icon.vue';
// import Users_Icon from '@/components/icons/Users_Icon.vue';
import Callers_Icon from '@/assets/icons/Callers_Icon.vue';
// import Target_Icon from '@/components/icons/Target_Icon.vue';
import Calls_Icon from '@/assets/icons/Calls_Icon.vue';


import Logout_Icon from '@/assets/icons/Logout_Icon.vue';

import { get as getFromStore, remove as removeFromStore } from '@/localStorage';


export default defineComponent({
    components: {
        Calls_Icon,
        Callers_Icon,
        //     Config_Icon,
        Home_Icon,
        MenuToggle_Icon,
        //     Settings_Icon,
        //     Target_Icon,
        //     Logout_Icon,
        //     Users_Icon,
        Logout_Icon
    },
    setup() {
        const logout = () => {

            removeFromStore('logged');
            //   api.cancel();
            router.push({
                name: 'login',
            });
        };
        const route = useRoute();

        const activeColor = ref('#0fadd4')
        const baseColor = ref('white')
        const colorKey = ref('')

        // const isAllowed = computed(() => getFromStore('auth.isAllowed') || false);
        // const isAdmin = computed(() => getFromStore('auth.isAdmin') || false);

        const loggedUser = computed(() => getFromStore("logged.username") || "Not logged");

        const isCompact = computed(
            //   () => getFromStore('settings.hasCompactMenu') || false
            () => true
        );

        //!!! needs to be solved fuck
        const toggledScreens = ref(
            [isCompact.value ? null : 
            router.currentRoute.value.meta.product].filter(
                Boolean
            )
            
        );

        
        const routeScreen = computed(() => router.currentRoute.value.meta.product);

        const defaultLink = () => {
            router.push({
                name: 'default',
            })
        };

        const toggleProduct = (key: string) => {
            toggledScreens.value = [key];
            colorKey.value = key;
        };

        const checkURL = (path: string) => {
            return route.path.includes(path)
        };

        // const logout = (path: string) => {
        //     // return route.path.includes(path)
        // };


        return {
            activeColor,
            baseColor,
            colorKey,

            //   isAllowed,
            //   isAdmin,
            //   isCompact,
              loggedUser,

            routeScreen,
            route,
            toggledScreens,

            checkURL,
            defaultLink,
            logout,
            toggleProduct,  // --> NAMING SUGGESTION SWITCH VIEW <--

        };
    },
});
</script>

<style scoped lang="scss"></style>
