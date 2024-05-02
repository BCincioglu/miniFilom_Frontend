import { mount, createLocalVue } from '@vue/test-utils';
import VehicleForm from '@/components/ModalFormVehicle.vue';
import axios from 'axios';

const localVue = createLocalVue();
localVue.prototype.$axios = axios;

describe('VehicleForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(VehicleForm, {
      localVue,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('form submit işlemi başarılıysa successDialog gösterilmeli', async () => {
    const mockResponse = { status: 200 };
    wrapper.setData({
      formData: {
        plateNumber: '34ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        productionYear: '2022',
        color: 'Siyah',
        type: 'Binek',
        status: 'Aktif',
        price: '100000',
      },
    });

    // Axios'un post metodunu mocklayarak başarılı bir yanıt döndürmesini sağlayalım
    axios.post = jest.fn().mockResolvedValue(mockResponse);

    await wrapper.vm.submitForm();

    expect(wrapper.vm.successDialog).toBe(true);
    expect(wrapper.vm.formData).toEqual({
      plateNumber: '',
      brand: '',
      model: '',
      productionYear: '',
      color: '',
      type: 'Binek',
      status: 'Pasif',
      price: '',
    });
  });

  it('form submit işlemi başarısız olduğunda hata mesajı gösterilmeli', async () => {
    const mockErrorResponse = { status: 500, data: { message: 'Internal Server Error' } };
    wrapper.setData({
      formData: {
        plateNumber: '34ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        productionYear: '2022',
        color: 'Siyah',
        type: 'Binek',
        status: 'Aktif',
        price: '100000',
      },
    });

    // Axios'un post metodunu mocklayarak hata yanıtı döndürmesini sağlayalım
    axios.post = jest.fn().mockRejectedValue(mockErrorResponse);

    await wrapper.vm.submitForm();

    expect(wrapper.vm.successDialog).toBe(false);
    // Hata durumunda form verileri sıfırlanmamalı
    expect(wrapper.vm.formData).toEqual({
      plateNumber: '34ABC123',
      brand: 'Toyota',
      model: 'Corolla',
      productionYear: '2022',
      color: 'Siyah',
      type: 'Binek',
      status: 'Aktif',
      price: '100000',
    });
  });
});
