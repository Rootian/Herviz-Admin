[Herviz-Admin](https://github.com/Rootian/Herviz-Admin) 是北美租车网站模板[Herviz](https://github.com/Rootian/Herviz)的后台管理系统的前端部分，提供对于租车服务的业务管理功能以及业务信息的数据可视化

**中文** | [English](https://github.com/Rootian/Herviz-Admin)

## 技术栈

|  前端框架  |          Vue.js           |
| :--------: | :-----------------------: |
|   UI框架   |          D2Admin          |
|  后端框架  | Springboot + Mybatis plus |
|  权限框架  |         Sa-Token          |
| 可视化组件 |         E-charts          |
|  缓存框架  |           Redis           |

## 功能概览

### DashBoard数据可视化

这个页面主要提供数据可视化服务，目前包括总收入、总订单、总用户数的按月增长统计，不同office、不同汽车品牌的营业额、订单量，以及当前库存情况

![admin_dashboard1](assets/admin_dashboard1.png)

![admin_dashboard2](assets/admin_dashboard2.png)



###  登录验证

Herviz-Admin使用开源框架Sa-token作为权限框架，提供员工登录、注册功能，以及用户session管理功能

![admin_login](../../NYU/Spring2022/db/project/report/admin_login.png)



### 车辆管理

提供对于库存车辆的管理功能，可以新增/修改车辆信息，更改车辆存储位置

![admin_vehicle_menu](assets/admin_vehicle_menu.png)

![admin_vehicle_edit](assets/admin_vehicle_edit.png)



### 订单管理

提供订单管理功能，包括检索查看用户订单，为订单设定里程费用等信息，修改订单等。

![admin_order_menu](assets/admin_order_menu.png)

![admin_order_edit](assets/admin_order_edit.png)



### 站点管理

提供对于租车站点的管理功能，可以新增/修改站点信息

![admin_office_menu](assets/admin_office_menu.png)

![admin_office_edit](assets/admin_office_edit.png)



### 车辆品牌管理

提供车辆品牌管理功能，包括新增/修改车辆品牌信息

![admin_vehicleClass_menu](assets/admin_vehicleClass_menu.png)

![admin_vehicleClass_edit](assets/admin_vehicleClass_edit.png)



### 优惠券管理

提供优惠券管理功能，包括优惠券的新增/修改，输入优惠券的生效日期以及折扣，系统会自动生成随机的优惠码

![admin_coupon_menu](assets/admin_coupon_menu.png)

![admin_coupon_add](assets/admin_coupon_add.png)

