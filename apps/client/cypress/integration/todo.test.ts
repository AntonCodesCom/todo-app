import TodoDto, { todoDtoInit } from '@antoncodes/server/src/todo/todo.dto';
import commonHash from '../../src/Common/utils/hash';

// utility
function todoDtoInitBatch(partials: Partial<TodoDto>[]): TodoDto[] {
  return partials.map((x) => todoDtoInit(x));
}

// config
const serverMocked = Cypress.env('SERVER_MOCKED') === 'true';

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
const updatedItemIndex = 0; // first

// utility
function composeUrl(pathname: string): string {
  return new URL(pathname, Cypress.env('SERVER_BASE_URL')).toString();
}

// db seeding
beforeEach(() => {
  !serverMocked &&
    cy.request(new URL('seed', Cypress.env('SERVER_BASE_URL')).toString());
});

//
// e2e test
//
it('Todo', () => {
  // intercepting fetch request
  cy.intercept(
    {
      method: 'GET',
      url: composeUrl('todo'),
    },
    (req) => {
      req.headers['Cache-Control'] = 'no-cache';
      serverMocked && req.reply({ body: { data: mockItems } });
    }
  ).as('fetchRequest');
  // opening the page
  cy.visit('/');
  // read (fetch)
  cy.wait('@fetchRequest').its('response').as('fetchResponse');
  cy.findByRole('list', { name: /^my todos$/i })
    .as('todoList')
    .invoke('attr', 'data-hash')
    .then((actualHash) => {
      cy.get('@fetchResponse')
        .its('body.data')
        .then((responseData) => {
          expect(actualHash).to.eq(commonHash(responseData as any));
        });
    });
  // update
  cy.intercept(
    {
      method: 'PATCH',
      url: composeUrl('todo/**'),
    },
    (req) => {
      // req.headers['Cache-Control'] = 'no-cache';
      serverMocked &&
        req.reply({
          body: {
            data: {
              ...mockItems[updatedItemIndex],
              done: true,
            },
          },
        });
    }
  ).as('updateRequest');
  cy.get('@todoList')
    .findAllByRole('listitem')
    .eq(updatedItemIndex)
    .as('todoItem1')
    .findByRole('checkbox')
    .as('todoItem1Checkbox')
    .click();
  cy.wait('@updateRequest')
    .as('updateRequestResult')
    .its('request')
    .then((request) => {
      const { url, body } = request;
      cy.get('@fetchResponse')
        .its('body.data')
        .then((dtos) => {
          const { id, done } = dtos[updatedItemIndex];
          expect(url).to.eq(composeUrl(`/todo/${id}`));
          expect(body).to.deep.eq({ done: !done });
        });
    });
  cy.get('@updateRequestResult')
    .its('response.body.data')
    .then((data) => {
      const condition: string = (data.done ? '' : 'not.') + 'be.checked';
      cy.get('@todoItem1Checkbox').should(condition);
    });
});
