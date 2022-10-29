import knex from 'knex';
import DataLoader from 'dataloader';

export const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});

db.on('query', ({sql}) => {
  console.log('Query is ', sql);
})

export const companyLoader = new DataLoader(async (companyIds) => {
  console.log('In DataLoader, company ids = ', companyIds);
  const companies = await db.select().from('companies').whereIn('id', companyIds);
  // The returned companies may not be in same order in which request was made
  return companyIds.map(id => {
    return companies.find(company => company.id === id)
  })
})