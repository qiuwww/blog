console.log('Mock', Mock);

Mock.mock('/mock', {
  name: '@name',
  'age|1-100': 100,
  color: '@color',
  from: 'form-mock',
});
