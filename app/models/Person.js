const { Model } = require('objection');

class Person extends Model {
  static get tableName() {
    return 'people';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'date', 'etat'],
      properties: {
        id: { type: 'string' },
        date: { type: 'string' },
        etat: { type: 'string' },
        place: { type: 'string' }
      }
    };
  }

  static validate(person) {
    const isValidDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(person.date);
    if (!isValidDate) {
      throw new Error('Invalid date format');
    }
  }

  $beforeInsert() {
    Person.validate(this);
  }
}


module.exports = { Person };
