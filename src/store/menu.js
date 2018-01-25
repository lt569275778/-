/**
 * Created by Mr.Zhou on 2017/8/7.
 */
export const menu_list = [
{
    icon: 'el-icon-setting',
    index: 'readme',
    title: '项目简介'
},
{
    icon: 'el-icon-menu',
    index: '100',
    title: '原始数据查询',
    subs: [{
        index: 'operatorIndex',
        icon: 'el-icon-document',
        title: '运营商数据查询'
    }, {
        index: 'cbankIndex',
        icon: 'el-icon-document',
        title: '征信原始数据查询'
    }, {
        index: 'chisIndex',
        icon: 'el-icon-document',
        title: '学历原始数据查询'
    }, {
        index: 'jdIndex',
        icon: 'el-icon-document',
        title: '京东原始数据查询'
    },
    {
        index: 'fsFundIndex',
        icon: 'el-icon-document',
        title: '公积金原始数据查询'
    },
    {
        index: 'ssinquiries',
        icon: 'el-icon-document',
        title: '社保原始数据查询'
    },{
        index: 'carInfo',
        icon: 'el-icon-document',
        title: '车险保单原始数据查询'
    },
    {
        index: 'tbindex',
        icon: 'el-icon-document',
        title: '淘宝信息原始数据查询'
    },
    {
        index: 'Journalindex',
        icon: 'el-icon-document',
        title: '用户日志信息查询'
    },
    {
        index: 'Creditindex',
        icon: 'el-icon-document',
        title: '信用卡日志信息查询'
    }
    ]
},
{
    icon: 'el-icon-menu',
    index: 'systemManagement',
    title: '系统管理',
    subs: [
        {
        index: 'user',
        icon: 'el-icon-document',
        title: '用户管理'
        },
        {
            index: 'gzgl',
            icon: 'el-icon-document',
            title: '机构管理'
        },
        {
            index: 'role',
            icon: 'el-icon-document',
            title: '角色管理'
        },
        {
            index: 'menu',
            icon: 'el-icon-document',
            title: '菜单管理'
        },
      
    ]
    }
,{
    icon: 'el-icon-menu',
    index: 'dataVindicate',
    title: '数据维护',
    subs: [
        {
        index: 'channelsIndex',
        icon: 'el-icon-document',
        title: '渠道信息维护'
        },
        {
            index: 'productIndex',
            icon: 'el-icon-document',
            title: '产品信息维护'
        },
        {
            index: 'channelProductMappingIndex',
            icon: 'el-icon-document',
            title: '渠道产品映射关系'
        }
    ]
    }
    ,{
        icon: 'el-icon-menu',
        index: 'browselogs',
        title: '日志查询',
        subs: [
            {
                index: 'logsIndex',
                icon: 'el-icon-document',
                title: '用户日志信息查询'
            },
            {
                index: 'userApplyIndex',
                icon: 'el-icon-document',
                title: '用户申请查询'
            }
        ]
    }

   /* {
        icon: 'el-icon-document',
        index: 'qzsz',
        title: '群组设置'
    }*/
];
