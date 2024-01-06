import { nanoid } from "nanoid";
import { ref, markRaw } from "vue";

import Notice from "@/components/common/Notice.vue";

const outlets = ref([]);

export const getOutlets = () => outlets.value;

export const showOutlet = ({ component, props, ...params }:any) => {
  
  // console.log('ami outlet', component);

  const outlet = {
    outlet_id: nanoid(),
    component: markRaw(component),
    props,
    scrollLock: false,
    ...params,
  };
  outlets.value = outlets.value.concat(outlet);
  // console.log('ami outlet', outlet);
  return outlet;
};

export const hideOutlet = (outlet_id:string) => {
  outlets.value = outlets.value.filter(
    (outlet:any) => outlet.outlet_id !== outlet_id
  );
};

export const showNotice = ({ props, ...params }:any) =>


  showOutlet({
    component: Notice,
    props,
    type: "notice",
    ...params,
  });

// export const showModal = ({ component, props, ...params }:any) =>
//   showOutlet({
//     component,
//     props,
//     type: "modal",
//     ...params,
//   });

