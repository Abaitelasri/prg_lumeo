const { PersonService } = require('../services/personService');

const personService = new PersonService();

class PersonController {
  async getPeoplePerDate(req, res, next) {
    try {
      const result = await personService.getPeoplePerDate();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPeoplePerHour(req, res, next) {
    try {
      const result = await personService.getPeoplePerHour();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPeoplePerDir(req, res, next) {
    try {
      const result = await personService.getPeoplePerDir();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async addPerson(req, res, next) {
    try {
      console.log('Request body:', req.body);

      let a;
      let dir;
      if (req.body.meta[0].nodes[0].lines[1].cur_dir1_objects[0]) {
        a = req.body.meta[0].nodes[0].lines[1].cur_dir1_objects[0];
        dir = 'dir1';
      } else {
        a = req.body.meta[0].nodes[0].lines[1].cur_dir2_objects[0];
        dir = 'dir2';
      }

      const timestamp = new Date(req.body.meta[0].timestamp).toISOString();

      const newPerson = await personService.addPerson(a, timestamp, dir,"door");

      console.log('Data inserted successfully');
      res.send('Data inserted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting data into database'+error);
      next(error);
    }
  }
 async personInWC(req, res, next) {
    try {
     

      let id;
      let dir;
      let a;
      if (req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0]) {
        id = req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0];
        dir = 'dir1';
        a="The bathroom isn't empty";
      
      } else {
        id = req.body.meta[0].nodes[0].lines[0].cur_dir2_objects[0];
        dir = 'dir2';
        a="The bathroom is empty";
      }

      const timestamp = new Date(req.body.meta[0].timestamp).toISOString();

      const newPerson = await personService.addPerson(id, timestamp, dir,req.body.meta[0].nodes[0].lines[0].label);

     
      res.send(a);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting data into database :'+error);
      next(error);
    }
  }

}

module.exports = { PersonController };
