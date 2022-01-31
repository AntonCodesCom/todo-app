import TodoItem from '../../src/Todo/interfaces/item';
import commonHash from '../../src/Common/utils/hash';
import todoItemInitBatch from '../../src/Todo/utils/item-init-batch';

// config
const serverBaseUrl = 'http://localhost:3001'; // TODO: env

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

//
// e2e test
//
it('Todo', () => {
  cy.intercept(`${serverBaseUrl}/todo`, { body: { data: mockItems } }).as(
    'fetchRequest'
  );
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
