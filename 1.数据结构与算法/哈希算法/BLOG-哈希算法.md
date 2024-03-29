---
title: 哈希算法&Hash码是怎么生成的
date: 2018-8-8
tags:
  - hash编码
categories:
  - [算法, hash编码]
---

## hash 编码

哈希算法(空间映射函数，散列算法)。

散列算法（Hash Algorithm），又称哈希算法，杂凑算法，是一种从任意文件中创造小的数字「指纹」的方法。与指纹一样，散列算法就是一种**以较短的信息来保证文件唯一性的标志**，这种标志与文件的每一个字节都相关，而且难以找到逆向规律。因此，当原有文件发生改变时，其标志值也会发生改变，从而告诉文件使用者当前的文件已经不是你所需求的文件。

HASH 算法是密码学的基础，比较常用的有 MD5 和 SHA，

### 最重要的两条性质，就是**不可逆**和**无冲突**

1. 所谓不可逆，就是当你知道 x 的 HASH 值，无法求出 x；
2. 所谓无冲突，就是当你知道 x，无法求出一个 y， 使 x 与 y 的 HASH 值相同。

### 这两条性质**在数学上都是不成立的**

**因为一个函数必然可逆**，且由于 HASH 函数的值域有限，理论上会有无穷多个不同的原始值，它们的 hash 值都相同。MD5 和 SHA 做到的，是求逆和求冲突在**计算上不可能**，也就是正向计算很容易，而反向计算即使穷尽人类所有的计算资源都做不到。

**密码学的几个算法（HASH、对称加密、公私钥）是计算机科学领域最伟大的发明之一，它授予了弱小的个人在强权面前信息的安全（而且是绝对的安全）。**

**一个优秀的 hash 算法，将能实现：**

1. 正向快速：给定明文和 hash 算法，在有限时间和有限资源内能计算出 hash 值。
2. 逆向困难：给定（若干） hash 值，在有限时间内很难（基本不可能）逆推出明文。
3. 输入敏感：原始输入信息修改一点信息，产生的 hash 值看起来应该都有很大不同。
4. 冲突避免：很难找到两段内容不同的明文，使得它们的 hash 值一致（发生冲突）。即对于任意两个不同的数据块，其 hash 值相同的可能性极小；对于一个给定的数据块，找到和它 hash 值相同的数据块极为困难。

## 用途

**文件签名**

文件内容很多，将文件内容通过 HASH 函数处理后得到一个 HASH 值，验证这个文件是否被修改过，只需要把文件内容用同样的 HASH 函数处理后得到 HASH 值再比对和文件一起传送的 HASH 值即可。

**保存密码到数据库（加盐）**

HASH 算法的另外一个很广泛的用途，就是很多程序员都会使用的在数据库中保存用户密码的算法，通常不会直接保存用户密码（这样 DBA 就能看到用户密码啦，好危险啊），而是**保存密码的 HASH 值，验证的时候，用相同的 HASH 函数计算用户输入的密码得到计算 HASH 值然后比对数据库中存储的 HASH 值是否一致，从而完成验证**。由于用户的密码的一样的可能性是很高的，防止 DBA 猜测用户密码，**我们还会用一种俗称“撒盐”的过程，就是计算密码的 HASH 值之前，把密码和另外一个会比较发散的数据拼接，通常我们会用用户创建时间的毫秒部分。**这样计算的 HASH 值不大会都是一样的，会很发散。最后，作为一个老程序员，我会把用户的 HASH 值保存好，然后把我自己密码的 HASH 值保存到数据库里面，然后用我自己的密码和其他用户的用户名去登录，然后再改回来解决我看不到用户密码而又要“偷窥”用户的需要。最大的好处是，数据库泄露后，得到用户数据库的黑客看着一大堆 HASH 值会翻白眼。

## 随机值存在一样的情况，如何避免

如下将介绍如何处理冲突，当然其前提是一致性 hash。

- 开放地址法
- 再哈希法
- 链地址法（拉链法）
- 建立一个公共溢出区
