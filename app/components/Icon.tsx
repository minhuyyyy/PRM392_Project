import AntDesign from '@expo/vector-icons/AntDesign';

export default function Icon({ name, size = 24 }) {
    return (
        <AntDesign
            name={name}
            size={size}
            color='white'
        />
    );
}
