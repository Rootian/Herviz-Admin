[Herviz-Admin](https://github.com/DB-CarRet/Herviz-Admin)  is the background management system of the North American car rental website template [Herviz](https://github.com/DB-CarRet/Herviz), providing business management functions for car rental services and data visualization of business information

[中文](https://github.com/DB-CarRet/Herviz-Admin/blob/master/README.zh.md) | **English**

## Technology Stack

| FrontEnd Framework |          Vue.js           |
| :----------------: | :-----------------------: |
| BackEnd Framework  | Springboot + Mybatis plus |
|    UI Framework    |          D2Admin          |
| Security Framework |         Sa-token          |
| Data Visualization |         E-charts          |
|       Cache        |           Redis           |



##Function Overview

### DashBoard

This page mainly provides data visualization services, which currently include monthly growth statistics of total revenue, total orders, and total users, turnover, order volume, and current inventory of different offices and car brands.

![admin_dashboard1](assets/admin_dashboard1.png)

![admin_dashboard2](assets/admin_dashboard2.png)



###  Authentication

**Herviz-Admin** uses the open source framework **Sa-token** as the permission framework to provide employee login, registration functions, and user session management functions

![admin_login](assets/admin_login.png)



### Vehicle Management

Provide management functions for inventory vehicles, you can add/modify vehicle information and change vehicle storage locations



![admin_vehicle_menu](assets/admin_vehicle_menu.png)

![admin_vehicle_edit](assets/admin_vehicle_edit.png)



### Order Management

Provide order management functions, including retrieving and viewing user orders, setting mileage fees and other information for orders, modifying orders, etc.



![admin_order_menu](assets/admin_order_menu.png)

![admin_order_edit](assets/admin_order_edit.png)



### Office Management

Provide management functions for car rental sites, you can add/modify site information



![admin_office_menu](assets/admin_office_menu.png)

![admin_office_edit](assets/admin_office_edit.png)



### Vehicle Class Management

Provide vehicle brand management functions, including adding/modifying vehicle brand information

![admin_vehicleClass_menu](assets/admin_vehicleClass_menu.png)

![admin_vehicleClass_edit](assets/admin_vehicleClass_edit.png)



### Coupon Management

Provide coupon management functions, including adding/modifying coupons, entering the effective date of the coupon and discount, and the system will automatically generate a random coupon code



![admin_coupon_menu](assets/admin_coupon_menu.png)

![admin_coupon_add](assets/admin_coupon_add.png)

