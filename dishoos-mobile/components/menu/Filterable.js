/*
* Implements filtering for items in supplied objects
*
*/

/*
* Allows for performing filtering on the supplied data.
*
*/
export default class Filter {

  data = []
  listeners = []
  activeFilters = []

  constructor(data, ...keys) {
    this.data = this.data.concat(data);
    for (let obj of this.data) {
      obj.filterable = [];
      for (let key of keys) {
        if (obj.hasOwnProperty(key)) {
          obj.filterable = obj.filterable.concat(obj[key]);
        }
      }
    }
  }

  get results() {
    return this.data.filter((obj) =>
      this.activeFilters.every((f) => f.satisfies(obj))
    );
  }

  include(filter) {
    this.activeFilters.push({
      name: filter,
      satisfies: (obj) => obj.filterable.includes(filter)
    });
  }

  remove(filter) {
    const index = this.activeFilters.findIndex((f) => f.name === filter);
    if (index > -1) {
      this.activeFilters.splice(index, 1)
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  __notifiy() {
    listeners.forEach((l) => l.update(this.results()));
  }
}
