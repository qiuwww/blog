const content =
  '辽宁1注,上海1注,江苏1注,山东2注,湖南2注,贵州1注,宁夏1注,深圳1注,共10注。其中一等奖特别奖为：上海1注,江苏1注,山东2注,湖南1注,贵州1注；一等奖普惠奖为：辽宁1注,湖南1注,宁夏1注,深圳1注。';

const parseContent = (content = '') => {
  const regExp = /([\u4e00-\u9fa5]{2,5})(\d{1,3})注/g;
  let itemRegRes;
  content.match(regExp).forEach(item => {
    // console.log('item', item);
    console.log('regRes', item, regExp.exec(item));
  });
};

parseContent(content);
