import { ICustomer } from "@/models/ICustomer";
import { IOrder } from "@/models/IOrder";
import { IProduct } from "@/models/IProduct";
// import { IActionList } from '@/models/IActionList';
// import { IUser } from '@/models/IUser';
import { IPaginationDetailedInfo } from '@/models/IUtilModels';
// import { IRule } from '@/models/IRule';
// import { IService } from '@/models/IService';
// import { ICallAction } from '@/models/ICallAction';
// import { IMatchingList } from '@/models/IMatchingList';

export interface GlobalState {
  products: IProduct[];
  orders: IOrder[];
  customers: ICustomer[];
  orderDetails: IOrder;

  //   isLoggedIn: boolean;
  //   serviceKeys: IServiceKey[];
  //   actionlists: IActionList[];
  //   users: IUser[];
  //   actionlistId: number;
    pages: number;
    pageNumber: number;
    count: number;
    numberOfPages: number;
    paginationDetailedInfo: IPaginationDetailedInfo;
    // pageReady: boolean;
    // perPage: number;

    // sorting: boolean;
    orderBy: string;
    // initialRightDistance: number;

  /*.
   * rule management structure
   */

  //   rules: IRule[];
  //   services: IService[];
  //   callActions: ICallAction[];
  //   matchingList: IMatchingList[];
  //   callersReports: []
  //   countries: []
  //   serviceInsight: {}
  //   simulationResults: Object
  //   inspectionResults: Object
}
