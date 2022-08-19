interface ButtonProps {
    type: string;
    value: string;
    onClick: React.MouseEventHandler<HTMLInputElement>;
}

export function Button({ type, value, onClick }: ButtonProps) {
    return <input type={type} value={value} onClick={onClick} />;
}
