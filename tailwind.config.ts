import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'app-1': '#121422',
        'app-2': '#1A1D33',
        'app-3': '#313559',
        'app-4': '#9CA0C3',
        'app-5': '#436BBA',
        'app-6': '#7DAAEF',
        'app-7': '#E75F5F',
        'app-8': '#E2E4F3',
      },
      fontFamily: {
        Noto: ['Noto Sans TC', 'sans-serif'],
      },
    },
  },
}
