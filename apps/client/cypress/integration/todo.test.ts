import TodoItem from '../../src/Todo/interfaces/item';
import commonHash from '../../src/Common/utils/hash';
import todoItemInitBatch from '../../src/Todo/utils/item-init-batch';

// test data
const mockItems: TodoItem[] = todoItemInitBatch([
  {
    id: 'todo-item-1-e2e',
    label: 'View todos',
    done: true,
  },
  {
    id: 'todo-item-2-e2e',
    label: 'Toggle a todo',
    done: false,
  },
  {
    id: 'todo-item-3-e2e',
    label: 'Delete a todo',
    done: false,
  },
  {
    id: 'todo-item-4-e2e',
    label: 'Create a todo',
    done: false,
  },
]);

// db seeding
beforeEach(() => {
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
      // req.reply({ body: { data: mockItems }});
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
