SELECT user_address.consignee,
user_address.mobile AS "订单表中的电话号码",
users.mobile AS "用户收货信息表的电话号码",
user_address.address

FROM user_address, users
WHERE user_address.user_id = users.user_id;
