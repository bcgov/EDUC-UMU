import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  let wrapper;
  
  beforeEach(() => {
    const localVue = createLocalVue();
  
    localVue.use(Vuetify);
  
    wrapper = mount(Footer, {
      localVue: localVue
    });
  });
  
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<a href=\"https://www.gov.bc.ca/\ " class=\"v-btn v-btn--flat v-btn--text theme--dark v-size--default\" id=\"footer-home\"><span class=\"v-btn__content\">Home</span></a>');
  });
});
