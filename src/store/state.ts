import { IOrder } from '@/models/IOrder';
import { GlobalState } from './types';

const state = (): GlobalState => {
  return {
    orders: [],
    products: [],
    customers: [],
    orderDetails: {} as IOrder,

    // isLoggedIn: false,
    // serviceKeys: [],
    // actionlists: [],
    // users: [],
    // actionlistId: 0,
    pages: 0,
    pageNumber: 1,
    count: 0,
    numberOfPages: 0,
    paginationDetailedInfo: {},
    // perPage: 5,

    // sorting: false,
    orderBy: ''
    // initialRightDistance: 0

    /*.
     * rule managemetn structure
     */
    
    // rules: [],
    // services: [],
    // countries: [],
    // serviceInsight: {},
    // callActions: [],
    // callersReports: [],
    // matchingList: [],
    // simulationResults: Object,
    // inspectionResults: Object,
  };
};

export default state;