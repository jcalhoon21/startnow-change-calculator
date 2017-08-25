const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, '../')));
app.listen(8888);

const url = 'http://localhost:8888/index.html';


describe('Change Calculator', function () {
  this.timeout(5000);
  this.slow(3000);
  
  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));

  describe('HTML', () => {
    let pageObject;

    before(() => {
      pageObject = Nightmare().goto(url);
    })

    it('should have a H1 with the text "Change Calculator"', () =>
      pageObject
        .evaluate(() => document.querySelector('h1').innerText)
        .then(heading => expect(heading).to.equal('Change Calculator'))
    );

    it('should have an input element with an id of "amount-due"', () => 
      pageObject
        .evaluate(() => document.querySelector('#amount-due'))
        .then(input => expect(input).to.exist)
    );

    it('should have an input element with an id of "amount-received"', () =>
      pageObject
        .evaluate(() => document.querySelector('#amount-received'))
        .then(input => expect(input).to.exist)
    );

    it('should contain a button with an id of "calculate-change"', () =>
      pageObject
        .evaluate(() => document.querySelector('#calculate-change'))
        .then(input => expect(input).to.exist)
    );

    [
      'dollars-output',
      'quarters-output',
      'dimes-output',
      'nickels-output',
      'pennies-output'
    ].map(id => {
      it(`should contain a paragraph element with an id of "${id}"`, () =>
        pageObject
          .evaluate((id) => document.querySelector(`#${id}`), id)
          .then(input => expect(input).to.exist)
      );
    });
  });

  describe('Integration', () => {
    let pageObject;

    beforeEach(() => {
      pageObject = Nightmare();
    })

    it(`should display correct change`, () => {
      return pageObject
        .goto(url)  
        .type('#amount-received', '20')
        .type('#amount-due', '10.21')
        .click('#calculate-change')
        .wait('#dollars-output')
        .evaluate(() => ({
          dollars: document.querySelector('#dollars-output').innerText,
          quarters: document.querySelector('#quarters-output').innerText,
          dimes: document.querySelector('#dimes-output').innerText,
          nickels: document.querySelector('#nickels-output').innerText,
          pennies: document.querySelector('#pennies-output').innerText,
        }))
        .end()
        .then(change => {
          expect(change.dollars).to.equal('9', 'Expected dollars didn\'t match');
          expect(change.quarters).to.equal('3', 'Expected quarters didn\'t match');
          expect(change.dimes).to.equal('0', 'Expected dimes didn\'t match');
          expect(change.nickels).to.equal('0', 'Expected nickels didn\'t match');
          expect(change.pennies).to.equal('4', 'Expected pennies didn\'t match');
        });
    });

    it(`should display correct change`, () => {
      return pageObject
        .goto(url)  
        .type('#amount-received', '20')
        .type('#amount-due', '13.34')
        .click('#calculate-change')
        .wait('#dollars-output')
        .evaluate(() => ({
          dollars: document.querySelector('#dollars-output').innerText,
          quarters: document.querySelector('#quarters-output').innerText,
          dimes: document.querySelector('#dimes-output').innerText,
          nickels: document.querySelector('#nickels-output').innerText,
          pennies: document.querySelector('#pennies-output').innerText,
        }))
        .end()
        .then(change => {
          expect(change.dollars).to.equal('6', 'Expected dollars didn\'t match');
          expect(change.quarters).to.equal('2', 'Expected quarters didn\'t match');
          expect(change.dimes).to.equal('1', 'Expected dimes didn\'t match');
          expect(change.nickels).to.equal('1', 'Expected nickels didn\'t match');
          expect(change.pennies).to.equal('1', 'Expected pennies didn\'t match');
        });
    });
  });
});
