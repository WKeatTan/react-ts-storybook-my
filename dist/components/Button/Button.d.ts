import React from 'react';
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant: 'primary' | 'danger';
    shape?: 'rounded';
}
declare const Button: React.FC<ButtonProps>;
export default Button;
