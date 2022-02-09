import TodoDto, {
  todoDtoInitBatch,
} from '@antoncodes/server/src/todo/todo.dto';
import commonHash from '../../src/Common/utils/hash';

// config
let realServer = true;
// uncomment this to stub the server out
// realServer = false;

// test data
const mockItems: TodoDto[] = todoDtoInitBatch([
  {
    id: '6203abb0460e025e0a39b09f',
    label: 'View todos',
    done: true,
  },
  {
    id: '6203abb9460e025e0a39b0a0',
    label: 'Toggle a todo',
    done: false,
  },
  {
    id: '6203abbf460e025e0a39b0a1',
    label: 'Delete a todo',
    done: false,
  },
  {
    id: '6203abc5460e025e0a39b0a2',
    label: 'Create a todo',
    done: false,
  },
]);

// db seeding
beforeEach(() => {
  realServer &&
    cy.request(new URL('seed', Cypress.env('SERVER_BASE_URL')).toString());
});

//
// e2e test
//
it('Todo', () => {
  cy.intercept(
    {
      method: 'GET',
      url: new URL('todo', Cypress.env('SERVER_BASE_URL')).toString(),
    },
    (req) => {
      req.headers['Cache-Control'] = 'no-cache';
      !realServer && req.reply({ body: { data: mockItems } });
    }
  ).as('fetchRequest');
  cy.visit('/');
  cy.wait('@fetchRequest').its('response').as('fetchResponse');
  cy.findByRole('list', { name: /^my todos$/i })
    .invoke('attr', 'data-hash')
    .then((actualHash) => {
      cy.get('@fetchResponse')
        .its('body.data')
        .then((responseData) => {
          expect(actualHash).to.eq(commonHash(responseData as any));
        });
    });
});
