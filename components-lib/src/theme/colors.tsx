import createPalette from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface SimplePaletteColorOptions {
    green?: string
    darkGreen?: string
    mediumGreen?: string
    turquoise?: string
    purple?: string
    white?: string
    black?: string
    gray1?: string
    gray2?: string
    gray3?: string
    gray4?: string
    yellow?: string
    red?: string
  }

  interface PaletteColor {
    green?: string
    darkGreen?: string
    mediumGreen?: string
    turquoise?: string
    purple?: string
    white?: string
    black?: string
    gray1?: string
    gray2?: string
    gray3?: string
    gray4?: string
    yellow?: string
    red?: string
  }
}

export const color = createPalette({
  primary: {
    main: '#32ae99',
    contrastText: '#fff',
    green: '#32ae99',
    darkGreen: '#248272',
    mediumGreen: '#35b3a4',
    turquoise: '#46daff',
    purple: '#32ae99',
  },
  secondary: {
    main: '#565655',
    white: '#fff',
    black: '#000',
    gray1: '#565655',
    gray2: '#b1b2b2',
    gray3: '#d9dada',
    gray4: '#ececec',
    yellow: ' #f5d14f',
    red: '#ff3333',
  },
})
