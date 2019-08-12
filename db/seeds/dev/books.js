
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
//example
const data = require('../../../data/cleaner');

const createCon = (knex, constellation) => {
  return knex('constellations').insert({
    name: constellation.name,
    mythology: constellation.mythology,
    first_appeared: constellation.first_appeared,
    genitive_form: constellation.genitive_form,
    brightest_star: constellation.brightest_star
  }, 'id')
    .then(constellationID => {
      let starPromises = [];
      constellation.stars.forEach(star => {
        starPromises.push(createStar(knex, {
          name: star.name,
          magnitude: star.magnitude,
          link: star.link,
          constellation_id: constellationID[0]
        }, 'id')
        )
      })

      return Promise.all(starPromises);
    })
}

const createStar = (knex, star) => knex('stars').insert(star)

exports.seed = function (knex) {
  return knex("stars").del()
    .then(() => knex("constellations").del())
    .then(() => {
      let conPromises = [];
      data.conData.forEach(con => conPromises.push(createCon(knex, con)))
      return Promise.all(conPromises)
    })
    .catch(error => console.log(`Error sending data: ${error}`));
};

//example

const projects = require("../../../data/projects");
const randomHex = require("randomcolor");

const createProject = (knex, project) => {
  return knex("projects")
    .insert(project, "id")
    .then(id => {
      return knex("palettes").insert({
        project_id: id[0],
        color_1: randomHex(),
        color_2: randomHex(),
        color_3: randomHex(),
        color_4: randomHex(),
        color_5: randomHex()
      });
    });
};

exports.seed = function(knex) {
  return knex("palettes")
    .del()
    .then(() => {
      return knex("projects").del();
    })
    .then(async () => {
      await knex.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");
      await knex.raw("TRUNCATE TABLE palettes RESTART IDENTITY CASCADE");
    })
    .then(() => {
      const projectPromises = [];
      projects.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });
      return Promise.all(projectPromises);
    });
};

//example

const pokemonData = require('../../../pokemon');
const trainerData = require('../../../trainers');

const createTrainer = (knex, trainer) => {
	return knex('trainers')
		.insert(
			{
				name: trainer.name,
				pokemon: trainer.pokemon
			},
			'id'
		)
		.then(id => {
			const joinerPromises = [];
			trainer.pokemon.forEach(p => {
				joinerPromises.push(createJoin(knex, id[0], p));
			});
			return Promise.all(joinerPromises);
		});
};

const createJoin = (knex, trainerID, pokemon) => {
	return knex('trainers_pokemon').insert({
		trainer_id: trainerID,
		pokemon_id: pokemon
	});
};

//example
exports.seed = function(knex) {
	return knex('trainers_pokemon')
		.del()
		.then(() => knex('pokemon').del())
		.then(() =>
			knex('trainers')
				.del()
				.then(async () => {
					await knex.raw('TRUNCATE TABLE pokemon RESTART IDENTITY CASCADE');
					await knex.raw('TRUNCATE TABLE trainers RESTART IDENTITY CASCADE');
				})
		)
		.then(() => {
			return Promise.all([knex('pokemon').insert(pokemonData)]);
		})
		.then(() => {
			const trainerPromises = [];
			trainerData.forEach(trainer => {
				trainerPromises.push(createTrainer(knex, trainer));
			});
			return Promise.all(trainerPromises);
		})
		.then(() => console.log('Seeding Complete'))
		.catch(error => console.log(`Error seeding file: ${error}`));
};

