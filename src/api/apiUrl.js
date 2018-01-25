var HOST = serviceHost;

const API = {

    /**************************************运营商数据查询******************************/
    // 查询运营商数据列表
    operatorList: HOST + '/operator/getOperatorList',
    // 查询个人详情
    operatorDetail: HOST + '/operator/getOperator',
    // 查询近六个月账单
    operatorBillList: HOST + '/operator/getHistoryBillList',
    // 查询通话详单
    operatorCallList: HOST + '/operator/getHistoryCallList',
    // 查询短信详单
    operatorMsgList: HOST + '/operator/getHistoryMsgList',
    /**************************************运营商数据查询******************************/

    /**************************************京东数据查询 begin******************************/
    // 查询京东原始数据列表
    jdList: HOST + '/jd/list',
    // 查询京东个人详情
    jdPerson: HOST + '/jd/jdPersonalInfo',
    // 地址信息
    jdAddressInfo: HOST + '/jd/addressInfo',
    // 查询通话详单
    jdOrderInfo: HOST + '/jd/orderInfo',
    /**************************************京东商数据查询 end******************************/


    /**************************************学信数据查询******************************/
    //学信数据列表查询
    chisList: HOST + '/chis/getChisList',
    chisEducationList: HOST + '/chis/getEducationList',
    /**************************************学信数据查询******************************/

    /********************************征信数据查询**********************************/
    //查询征信数据列表
    cbankList: HOST + '/centralBank/list',
    //查询征信详情
    cbankDetail: HOST + '/centralBank/bankPersonalInfo',
    //查询贷款概要信息
    cbankLoanMain: HOST + '/centralBank/creditOutline',
    //信用卡详情
    cbankCentral: HOST + '/centralBank/creditCardDetails',
    //贷款详情
    cbankLoanDetailsInfo: HOST + '/centralBank/loanDetailsInfo',
    //查询为他人担保详情
    cbankGuaranteeInfo: HOST + '/centralBank/guaranteeInfo',
    //查询代偿担保人详情
    cbankCompensatory: HOST + '/centralBank/compensatoryWarrantorInfo',
    //查询欠税记录
    cbankOwing: HOST + '/centralBank/owingTaxesInfo',
    //查询民事判决记录
    cbankCivil: HOST + '/centralBank/civilJudgementInfo',
    //查询强制执行记录
    cbankEnforce: HOST + '/centralBank/enforceRecordInfo',
    //查询行政处罚记录
    cbankPunishment: HOST + '/centralBank/punishmentInfo',
    //查询电信欠费记录
    cbankTelecom: HOST + '/centralBank/telecomArrearsInfo',
    //征信查询明细
    cbankQuiry: HOST + '/centralBank/creditInquiryDetails',
    /********************************征信数据查询**********************************/

    /************************渠道信息维护 begin******************************/
    //获取渠道数据列表
    channelList: HOST + '/dateMaintain/channelList',
    getChannelInfo: HOST + '/dateMaintain/getChannelInfo',
    saveChannel: HOST + '/dateMaintain/saveChannelInfo',
    deleteChannel: HOST + '/dateMaintain/deleteChannel',
    /************************渠道信息维护 end******************************/

    /************************产品信息维护 begin******************************/
    //获取所有产品数据列表
    ProductList: HOST + '/certification/list',
    getProduct: HOST + '/certification/getCertification',
    saveProduct: HOST + '/certification/saveCertification',
    deleteProduct: HOST + '/certification/deleteCertification',
    getProductOptions: HOST + '/certification/getProductOptions',
    /************************产品信息维护 begin******************************/

    /************************渠道产品映射 begin******************************/
    channelProductList: HOST + '/dateMaintain/channelCertificationMappingList',
    getChannelProductMapping: HOST + '/dateMaintain/getCertificationMapping',
    saveChannelProductMapping: HOST + '/dateMaintain/saveCertificationMapping',
    deleteChannelCertification: HOST + '/dateMaintain/deleteCertificationMapping',
    /************************渠道产品映射 end******************************/

    /************************公积金原始数据查询 begin******************************/
    fundReportInfo: HOST + '/fund/fundReportInfo',
    loansRecord: HOST + '/fund/loansRecord',
    loansFlows: HOST + '/fund/loansFlows',
    fundPersonInfo: HOST + '/fund/fundPersonInfo',
    fundPayRecord: HOST + '/fund/payRecord',
    fsFundList: HOST + '/fund/FsFundList',
    getRequestId: HOST + '/fund/getRequestId',
    /************************公积金原始数据查询 end******************************/

    /********************************渠道下拉框查询**********************************/
    getChannelOption: HOST + '/dateMaintain/getChannelOptions',
    /********************************渠道下拉框查询**********************************/

    /**********************************登录******************************************/
    getBackgroundUser: HOST + '/background/login',
    /**********************************新增机构******************************************/
    addrole: HOST + '/background/insertRole',
    adduser: HOST + '/background/insertUser ',

    updatejg: HOST + '/background/updateOrganization',
    // search:HOST+'/background/selectOrganization',
    //  查询组织机构列表
    selectjg: HOST + '/background/selectOrganizationList',
    // 新增组织机构
    getaddjg: HOST + '/background/insertOrganization',
    // 删除组织机构
    deletejg: HOST + '/background/stopOrganization',
    // 查询个人信息
    getinfojg: HOST + '/background/selectOrganization',
    // 查询下拉菜单jg
    selectmainjg: HOST + '/background/getOrganizationSelections',
    // 菜单列表
    selectmain: HOST + '/background/selectMenuList',
    //查询菜单
    selectMenu: HOST + '/background/selectMenu',
    //删除菜单
    deleteMenu: HOST + '/background/stopMenu',
    // 新增菜单
    insertMenu: HOST + '/background/insertMenu/',
    // 获取树桩菜单
    inserttree: HOST + '/background/getMenuSeletions',
    updateMenu: HOST + '/background/updateMenu',
    // 车险保单
    carlist: HOST+'/td/cxbdList',
    carPersonInfo: HOST + '/td/getCXBDBaseInfo',
    getCarVehicleInfo: HOST + '/td/getCarVehicleInfo',
    getCarInsuranceInfo: HOST + '/td/getCarInsuranceInfo',
    getCarInsuranceDetail: HOST + '/td/getCarInsuranceDetail',
    getCarApplicantInsurantInfo: HOST + '/td/getCarApplicantInsurantInfo',
    // 富数社保数据主列表
    getSB: HOST + '/fund/socialsecurity/list',
    getsbinfo: HOST + '/fund/socialsecurity/accountInfo',
    getsbreport:HOST+'/fund/socialsecurity/report',
    // 险种信息
    getpayRecord:HOST+'/fund/socialsecurity/insurances',
    // 缴存流水
    getloansRecord:HOST+'/fund/socialsecurity/flows',
    getreprotinfo:HOST+'/fund/socialsecurity/consumption',
    // 增加角色
    addmenurole:HOST+'/background/insertRole',
    selectRoleSelections:HOST+'/background/selectRoleSelections',
    // addroletree:HOST+''
    selectRole:HOST+'/background/selectRole',
    selectRoleList:HOST+'/background/selectRoleList',
    deleterole:HOST+'/background/stopRole',
    updateRole:HOST+'/background/updateRole',
    // 用户管理insertRole
    insertUser:HOST+'/background/insertUser',
    selectUserList:HOST+'/background/selectUserList',
    selectUserid:HOST+'/background/selectUser',
    updatauser:HOST+'/background/updateUser',
     stopUser:HOST+'/background/stopUser',
    //  淘宝
    taobaoList:HOST+'/taoBao/taobaoList',
    addressesInfo:HOST+'/taoBao/addressesInfo',
    ordersInfo:HOST+'/taoBao/ordersInfo',
    // 修改密码
    insertpass:HOST+'/background/changePassword',
    // 权限接口
    hasRes:HOST+'/background/hasRes',
    insertpass:HOST+'/background/changePassword',
    // 权限接口

    getBrowselogs:HOST+'/browse/logs',

    getUserApply:HOST+'/browse/useApply',
    // 信用卡
    creditBillingCheckList:HOST+'/creditCardBill/creditBillingCheckList',
    creditBillingInfoList:HOST+'/creditCardBill/creditBillingInfoList',
    creditTransInfoList:HOST+'/creditCardBill/creditTransInfoList',
    creditInstallmentInfo:HOST+'/creditCardBill/creditInstallmentInfo'
}

export default API
