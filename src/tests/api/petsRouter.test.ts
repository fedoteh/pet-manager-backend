// __tests__/petsRouter.test.ts

import express from 'express';
import request from 'supertest';
import petsRouter from '../../routes/v1/pets/petsRouter';
import { Species } from '../../util/types/types';

const app = express();
app.use('/pets', petsRouter);

describe('petsRouter', () => {
  it('should return 404 for invalid species', async () => {
    const response = await request(app).get('/pets/invalidSpecies');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Species not found');
  });

  it('should route to dogsRouter for species "dogs"', async () => {
    const response = await request(app).get(`/pets/${Species.Dogs}`);
    // dogsRouter sends a 200 status for valid requests
    expect(response.status).toBe(200);
  });

  it('should route to catsRouter for species "cats"', async () => {
    const response = await request(app).get(`/pets/${Species.Cats}`);
    // catsRouter sends a 200 status for valid requests
    expect(response.status).toBe(200);
  });

  it('should return a cat by id', async () => {
    const response = await request(app).get(`/pets/${Species.Cats}/1`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return a dog by id', async () => {
    const response = await request(app).get(`/pets/${Species.Dogs}/1`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });
});