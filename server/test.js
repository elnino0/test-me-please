process.env.PORT = 3002

const request = require('supertest');
const app = require('./index');
const { expect } = require('chai');

/*
this is a unit test
testng one unit at the time 
normally you want to add your main functions to the test
and your utils functions to the test
and then test the api  
 */
describe('Calculator API', () => {
    it('should calculate correctly', async () => {
      const body = {
        num1: 10,
        num2: 5,
        operator: '+'
      }
      const response = await request(app).post('/api/calculate')
        .send(body);
      expect(response.status).to.be.equal(200);
      expect(response.body.result).to.be.equal('15');
      })
    })