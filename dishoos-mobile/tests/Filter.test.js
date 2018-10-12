import Filter from '../components/menu/Filterable.js';

const objOne = {
      filterOnOne: ['a1', 'a2'],
      filterOnTwo: ['b1', 'b2', 'b3'],
};

const objTwo = {
  filterOnOne: ['a3', 'a4'],
};

const objThree = {
  irrelevant: ['c1', 'c2'],
}

test('it identifies filterable data correctly', () => {
  const data = [objOne, objTwo, objThree];
  const filter = new Filter(data, 'filterOnOne', 'filterOnTwo');
  expect(filter.results[0].filterable).toEqual(['a1', 'a2', 'b1', 'b2', 'b3']);
  expect(filter.results[1].filterable).toEqual(['a3', 'a4']);
  expect(filter.results[2].filterable).toEqual([]);
});

test('it only includes the filtered items', () => {
  const data = [objOne, objTwo, objThree];
  const filter = new Filter(data, 'filterOnOne', 'filterOnTwo');
  filter.include('a1');
  filter.include('b3');
  expect(filter.results.length).toEqual(1);
  expect(filter.results[0]).toEqual(objOne);
});

test('it should remove applied filters', () => {
  const data = [objOne, objTwo, objThree];
  const filter = new Filter(data, 'filterOnOne', 'filterOnTwo');
  filter.include('a1');
  filter.remove('a1');
  expect(filter.results[0].filterable).toEqual(['a1', 'a2', 'b1', 'b2', 'b3']);
  expect(filter.results[1].filterable).toEqual(['a3', 'a4']);
  expect(filter.results[2].filterable).toEqual([]);
});
