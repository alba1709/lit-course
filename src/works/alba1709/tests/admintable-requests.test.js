import { expect, fixture, html } from '@open-wc/testing';
import '../adminHoliday/table-admin';
import { employeeRequest } from '../adminHoliday/utils/constants';
import { orderList } from '../solicitudVacaciones/utils/functions';

describe('Admin holidays form tests:', () => {
  describe('Empty applications table', () => {
    let el;

    before(async () => {
      el = await fixture(html`<table-admin></table-admin>`);
      await el.updateComplete;
    });

    it('Table is rendered correctly', async () => {
      expect(el.shadowRoot).not.to.be.null;
    });

    it('Render only table header', async () => {
      const cells = el.shadowRoot.querySelectorAll('th');
      expect(cells.length).equal(6);
    });
  });

  describe('Order function', () => {
    let el;
    before(async () => {
      const component = html` <table-admin .adminTable="${employeeRequest}"></table-admin> `;

      el = await fixture(component);
      await el.updateComplete;
    });

    it('Order requests works properly', async () => {
      const orderButton = el.shadowRoot.querySelectorAll('.btnOrder')[0];
      orderButton.click();
      const newList = orderList(employeeRequest, 'name');
      expect(newList).to.eql(el.adminTable);
    });

    it('Reverse requests works properly', async () => {
      const orderButton = el.shadowRoot.querySelectorAll('.btnOrder')[0];
      orderButton.click();
      orderButton.click();
      const newList = orderList(employeeRequest, 'name');
      const reverseList = orderList(newList, 'name');
      expect(reverseList).to.eql(el.adminTable);
    });
  });
});
