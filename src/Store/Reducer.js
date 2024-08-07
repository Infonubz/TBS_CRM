import {
  PROMOTION_DATA,
  USER_MANAGEMENT_ADMIN_LIST,
  USER_MANAGEMENT_LIST,
  SUPER_ADMIN_LIST,
  USER_MANAGEMENT_USER_LIST,
  OFFERS_LIST,
  OPERATOR_LIST,
  GET_EMPLOYEE_LIST,
  GET_PARTNER_LIST,
  ADS_LIST,
  GET_ADS,
  REQUEST_MANAGEMENT_DATA,
  GET_ROLE_NAME,
  GET_PERMISSIONS,
  GET_ROLES,
  REQ_PROMOTION_DATA,
  CLIENT_DATA,
  IMPORT_DATA_LIST,
  COMPANY_SETTING,
  EMPLOYEE_DOC,
  OPERATOR_DOC,
  PARTNER_DOC,
  GET_SUBSCRIPTION,
  FORGOT_PASSWORD,
  PRODUCT_OWNER_DATA,
  UNREAD_NOTIFICATION,
  NOTIFICATION_DATA,
  GET_ADS_CLIENT,
  GET_PERMISSION_COUNT,
  GET_ROLES_COUNT,
  GET_OPERATOR_NAME,
  USER_SETTINGS_EDIT,
  GET_OP_EMP_COUNT,
  GET_PRO_EMP_COUNT,
  GET_MOBILE_ADS,
} from "./Type";

const initialState = {
  promotion_data: [],
  user_management_admin_list: [],
  user_management_user_list: [],
  offers_list: [],
  super_admin_list: [],
  operator_list: [],
  employee_list: [],
  partner_list: [],
  ads_list: [],
  request_management: [],
  req_promotion: [],
  client_data: [],
  import_data: [],
  company_setting: [],
  employee_documents: [],
  operator_documents: [],
  partner_documents: [],
  subscription_list: [],
  forgot_password: [],
  product_owner_data: [],
  unread_notification: [],
  notification_data: [],
  ads_client_list: [],
  permission_count: [],
  roles_count: [],
  operator_name: [],
  user_settings_edit: [],
  op_emp_count: [],
  pro_emp_count: [],
  mobile_adsList: [],
};

export const crmreducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROMOTION_DATA:
      return {
        ...state,
        promotion_data: payload,
      };
    case USER_MANAGEMENT_ADMIN_LIST:
      return {
        ...state,
        user_management_admin_list: payload,
      };
    case USER_MANAGEMENT_USER_LIST:
      return {
        ...state,
        user_management_user_list: payload,
      };
    case OFFERS_LIST:
      return {
        ...state,
        offers_list: payload,
      };
    case SUPER_ADMIN_LIST:
      return {
        ...state,
        super_admin_list: payload,
      };
    case OPERATOR_LIST:
      return {
        ...state,
        operator_list: payload,
      };
    case GET_EMPLOYEE_LIST:
      return {
        ...state,
        employee_list: payload,
      };
    case GET_PARTNER_LIST:
      return {
        ...state,
        partner_list: payload,
      };
    case ADS_LIST:
      return {
        ...state,
        ads_list: payload,
      };
    case GET_ADS:
      return {
        ...state,
        ad_list: payload,
      };
    case REQUEST_MANAGEMENT_DATA:
      return {
        ...state,
        request_management: payload,
      };
    case GET_ROLES:
      return {
        ...state,
        role_list: payload,
      };
    case GET_PERMISSIONS:
      return {
        ...state,
        permission_list: payload,
      };
    case GET_ROLE_NAME:
      return {
        ...state,
        role_name_list: payload,
      };
    case REQ_PROMOTION_DATA:
      console.log(payload, "payload6455");
      return {
        ...state,
        req_promotion: payload,
      };
    case CLIENT_DATA:
      console.log(payload, "payload6455");
      return {
        ...state,
        client_data: payload,
      };
    case GET_SUBSCRIPTION:
      return {
        ...state,
        subscription_list: payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgot_password: payload,
      };
    case IMPORT_DATA_LIST:
      return {
        ...state,
        import_data: payload,
      };
    case COMPANY_SETTING:
      return {
        ...state,
        company_setting: payload,
      };
    case EMPLOYEE_DOC:
      return {
        ...state,
        employee_documents: payload,
      };
    case OPERATOR_DOC:
      return {
        ...state,
        operator_documents: payload,
      };
    case PARTNER_DOC:
      return {
        ...state,
        partner_documents: payload,
      };
    case PRODUCT_OWNER_DATA:
      return {
        ...state,
        product_owner_data: payload,
      };
    case UNREAD_NOTIFICATION:
      console.log(payload, "oldtownroad");
      return {
        ...state,
        unread_notification: payload,
      };
    case NOTIFICATION_DATA:
      return {
        ...state,
        notification_data: payload,
      };
    case GET_ADS_CLIENT:
      return {
        ...state,
        ads_client_list: payload,
      };
    case GET_PERMISSION_COUNT:
      return {
        ...state,
        permission_count: payload,
      };
    case GET_ROLES_COUNT:
      return {
        ...state,
        roles_count: payload,
      };
    case GET_OPERATOR_NAME:
      return {
        ...state,
        operator_name: payload,
      };

    case USER_SETTINGS_EDIT: {
      return {
        ...state,
        user_settings_edit: payload,
      };
    }
    case GET_OP_EMP_COUNT:
      return {
        ...state,
        op_emp_count: payload,
      };
    case GET_PRO_EMP_COUNT:
      return {
        ...state,
        pro_emp_count: payload,
      };
    case GET_MOBILE_ADS:
      return {
        ...state,
        mobile_adsList: payload,
      };
    case GET_OPERATOR_NAME:
      return {
        ...state,
        operator_name: payload,
      };
    default:
      return state;
  }
};
