exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'frodo',
          password:
            '$2y$12$M0k0YXl/5tOifwsHTnLer.YRbIep2ts9/B1wqOJmed8WRDpEgtBxi'
        },
        {
          username: 'aragon',
          password:
            '$2y$12$M0k0YXl/5tOifwsHTnLer.YRbIep2ts9/B1wqOJmed8WRDpEgtBxi'
        },
        {
          username: 'sam',
          password:
            '$2y$12$M0k0YXl/5tOifwsHTnLer.YRbIep2ts9/B1wqOJmed8WRDpEgtBxi'
        }
      ]);
    });
};
