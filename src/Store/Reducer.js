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
  GET_OPERATOR_EMAILID,
  GET_ALL_EMAIL_INFO,
  GET_RECENT_OFFERS,
  GET_RECENT_ADS,
  GET_RECENT_PROMOFILE,
  REQ_MAN_OFFERS,
  GET_REQ_ADS,
  OPERATOR_BYID,
  PARTNER_BYID,
  BIN_DATA,
  TBS_INFO,
  REFER_EARN,
  REDEEM_OFFER,
  OPERATOR_DATA,
  PROMO_BG_IMAGE,
  GET_REQ_PARTNER,
  GET_ROLES_PERMISSION,
  GET_REQ_MOB_ADS,
  THEME_BACKGROUND,
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
  get_all_email_info: [],
  get_all_operator_email: [],
  notification_count: "",
  req_man_offers: [],
  get_req_ads: [],
  operator_byid: {},
  bin_data: [],
  tbs_info: {},
  refer_earn: [],
  operator_data: [],
  promo_bg: "",
  get_req_partner: [],
  get_roles_permission: [],
  get_req_mob_ads: [],
  theme_background:[],
};

export const crmreducer = (state = initialState, action) => {
  const { type, payload, payload_count } = action;
  switch (type) {
    case PROMOTION_DATA:
      console.log(payload, "PROMOTION_DATA");
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
      console.log(payload, "OFFERS_LIST");
      return {
        ...state,
        offers_list: payload,
      };
    case SUPER_ADMIN_LIST:
      console.log(payload, "super_admin_list");
      return {
        ...state,
        super_admin_list: payload,
      };
    case OPERATOR_LIST:
      console.log(payload, "operator_list_payload");
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
    // case NOTIFICATION_DATA:
    //   return {
    //     ...state,
    //     notification_data: payload,
    //   };
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

    case GET_OPERATOR_EMAILID: {
      // console.log(payload, "payloadpayload");
      return {
        ...state,
        get_all_operator_email: payload,
      };
    }

    case GET_ALL_EMAIL_INFO: {
      return {
        ...state,
        get_all_email_info: payload,
      };
    }
    case GET_RECENT_PROMOFILE: {
      return {
        ...state,
        get_recent_promofile: payload,
      };
    }

    case GET_RECENT_ADS: {
      return {
        ...state,
        get_recent_ads: payload,
      };
    }

    case GET_RECENT_OFFERS: {
      return {
        ...state,
        get_recent_offers: payload,
      };
    }

    case NOTIFICATION_DATA:
      console.log(payload, "reducer notifiaction");
      console.log(payload_count, "payload_count");
      return {
        ...state,
        notification_data: payload,
        notification_count: payload_count,
      };
    case REQ_MAN_OFFERS:
      return {
        ...state,
        req_man_offers: payload,
      };
    case GET_REQ_ADS: {
      return {
        ...state,
        get_req_ads: payload,
      };
    }
    case OPERATOR_BYID:
      console.log(payload, "operator_byid");
      return {
        ...state,
        operator_byid: payload,
      };
    case PARTNER_BYID:
      console.log(payload, "partner_byid");
      return {
        ...state,
        partner_byid: payload,
      };
    case BIN_DATA:
      return {
        ...state,
        bin_data: payload,
      };

    case TBS_INFO:
      console.log(payload, "tbs_info");
      return {
        ...state,
        tbs_info: payload,
      };
    case REFER_EARN:
      console.log(payload, "refer_earn");
      return {
        ...state,
        refer_earn: payload,
      };
    case REDEEM_OFFER:
      console.log(payload, "REDEEM_OFFER");
      return {
        ...state,
        redeem_offer: payload,
      };
    case OPERATOR_DATA:
      console.log(payload, "OPERATOR_DATA");
      return {
        ...state,
        operator_data: payload,
      };
    case PROMO_BG_IMAGE:
      console.log(payload, "payload988585858");

      return {
        ...state,
        promo_bg: payload,
      };
    case GET_REQ_PARTNER:
      return {
        ...state,
        get_req_partner: payload,
      };
    case GET_ROLES_PERMISSION:
      console.log(payload, "GET_ROLES_PERMISSION");
      return {
        ...state,
        get_roles_permission: payload,
      };

    case GET_REQ_MOB_ADS: {
      return {
        ...state,
        get_req_mob_ads: payload,
      };
    }
    case THEME_BACKGROUND: {
      return {
        ...state,
        theme_background: payload,
      };
    }
    default:
      return state;
  }
};
