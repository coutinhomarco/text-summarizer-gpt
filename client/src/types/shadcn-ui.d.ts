declare module '@shadcn/ui' {
    import * as React from 'react';
  
    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary' | 'tertiary';
    }
  
    export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
    export const Button: React.FC<ButtonProps>;
    export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  }
  