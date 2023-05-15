const { Person } = require('../models/Person');

class PersonService {
  async getPeoplePerDate() {
    try {
      const result = await Person.query()
        .select(Person.raw('DATE(`date`) as date'))
        .count('id as count_per_day')
        .groupByRaw('DATE(`date`)');

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPeoplePerHour() {
    try {
      const result = await Person.query()
        .select(Person.raw('DATE_FORMAT(`date`, "%H:00") as date'))
        .count('id as count_per_hour')
        .groupByRaw('HOUR(`date`)');

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPeoplePerDir() {
    try {
      const result = await Person.query()
        .select('etat')
        .count('id as count_per_dir')
        .groupBy('etat');

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addPerson(a, timestamp, dir, place) {
    try {
      const newPerson = await Person.query().insert({
        id: a,
        date: timestamp,
        etat: dir,
        place: place
      });

      console.log('Data inserted successfully');
      return newPerson;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { PersonService };
