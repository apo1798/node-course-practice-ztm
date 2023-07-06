import supertest from 'supertest';
import { app } from '../../app';
import { mongoConnect, mongoDisconnect } from '../../services/mongo';

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    try {
      await mongoDisconnect();
    } catch (e) {
      console.log(e);
    }
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const res = await supertest(app)
        .get('/v1/launches')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  describe('Test Post /launch', () => {
    const completeLaunchData = {
      mission: 'LOL',
      rocket: 'Test',
      target: 'Kepler-442 b',
      launchDate: '2023-12-31',
    };

    const launchDataWithoutDate = {
      mission: 'LOL',
      rocket: 'Test',
      target: 'Kepler-442 b',
    };

    const launchDataWithInvalidDate = {
      mission: 'LOL',
      rocket: 'Test',
      target: 'Kepler-442 b',
      launchDate: 'baogerneal',
    };

    test('It should respond with 201 success', async () => {
      const res = await supertest(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(res.body.launchDate).valueOf();

      expect(res.body).toMatchObject(launchDataWithoutDate);
      expect(requestDate).toBe(responseDate);
    });

    test('It should catch missing required properties', async () => {
      const res = await supertest(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    test('It should catch invalid dates', async () => {
      const res = await supertest(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 'Invalid launch date...',
      });
    });
  });
});
