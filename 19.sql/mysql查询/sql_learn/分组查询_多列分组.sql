SELECT consignee AS 收货地址, mobile AS 联系方式 FROM user_address;

-- mysql中的字符串拼接，需要使用concat函数
SELECT concat('收货人：',consignee,'的地址为: ',address) AS 收货地址, concat('联系电话为：',mobile)  AS 联系方式 FROM user_address;

-- 这里有问题啊，一直没发正常运行
-- 可以了，但是这里的a什么意思呢a，删除了a，就没输出了
SELECT 收货地址, 联系方式
FROM (SELECT concat('收货人：',consignee,'的地址为: ',address) AS 收货地址, 
concat('联系电话为：',mobile)  AS 联系方式
FROM user_address) a
GROUP BY 收货地址, 联系方式;