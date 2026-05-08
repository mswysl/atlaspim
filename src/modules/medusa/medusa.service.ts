import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MedusaService {
  async createProduct(product: any) {
    return axios.post(`${process.env.MEDUSA_URL}/admin/products`, product, {
      headers: {
        'x-medusa-access-token': process.env.MEDUSA_API_KEY || '',
      },
    });
  }
}
