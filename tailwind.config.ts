import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#F5FAFF',
          '100': '#EBF4FF',
          '200': '#CFE2FF',
          '300': '#B0C9FF',
          '400': '#728BFC',
          '500': '#383ffc',
          '600': '#2D33E3',
          '700': '#1E23BD',
          '800': '#141896',
          '900': '#0B0D73',
          '950': '#04064A'
        }
      },
      fontFamily: {
        inter: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
};

