/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'big': '250px'
      },
      invert: {
        'grey': ".7"
      },
      colors: {
        'text': 'black',
        'grey': '#393939',
        'transparent': '#ffffff00',
        'white': '#ffffff',
        'border-grey': '#E4E4E4',
        'input-light-grey': '#F8F8F8',
        'errors': 'red',
        'light-pink': '#DE30B7',
        'dark-pink': '#6A1056',
        'light-text': '#696969',
        'feed-border': '#ffffff40',
        'page-light-dark': '#242424',
        'page-dark': '#1D1D1D',
        'subtitle': '#727272',
        'description': '#C2C2C2',
        'textarea': '#ffffff34',
        'load-more': '#ffffff20',
        'transparent-pink': '#DE30B790'
      },
      fontSize: {
        '5xl': '9rem',
        'big-title': '26px',
        'small-subtitle': '14px',
        'mini-text': '12px',
        'smallest-text': '11px',
        'card-title': '22px',
      },
      fontFamily: {
        'text': ['Inter', 'ui-sans-serif'],
        'logo': ['Nasalization', 'ui-sans-serif']
      },
      backgroundImage: {
        signIllustration: "url('../../assets/images/bg.png')",
        stars: "url('../../assets/images/stars.gif')",
        footer: "url('../../assets/images/moon.jpg')"
      },
      rotate: {
        'logo': '10deg',
      },
      borderRadius: {
        '1/2': "2000px",
      }
    },
  },
  plugins: [],
}