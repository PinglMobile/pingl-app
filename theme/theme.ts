export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    subText: string;
    buttonText: string;
    border: string;
    notification: string;
    disabled: string;
  };
  fonts: {
    poppins: {
      regular: string;
      bold: string;
    };
  };
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#FF5A5F',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    subText: "#6D6D6D",
    buttonText: "#FFFFFF",
    border: '#E0E0E0',
    notification: '#FF5A5F',
    disabled: "#FFB8A4"
  },
  fonts: {
    poppins: {
      regular: 'Poppins-Regular',
      bold: 'Poppins-Bold',
    },
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FF5A5F',
    background: '#212121',
    card: '#424242',
    text: '#FFFFFF',
    subText: "#BDBDBD",
    buttonText: "#FFFFFF",
    border: '#4F4F4F',
    notification: '#FF5A5F',
    disabled: "#FFB8A4"
  },
  fonts: {
    poppins: {
      regular: 'Poppins-Regular',
      bold: 'Poppins-Bold',
    },
    
  },
};
