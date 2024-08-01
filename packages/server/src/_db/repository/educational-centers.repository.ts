import { AppDataSource } from '../../app/globals.app.js';
import { EducationCenterEntity } from '../entity/_index.js';

export const EducationCenterRepository = AppDataSource.getRepository(
  EducationCenterEntity,
).extend({
  async findByCity(city: string): Promise<EducationCenterEntity[]> {
    return this.createQueryBuilder('educationCenter')
      .where('educationCenter.city = :city', { city })
      .getMany();
  },
});
