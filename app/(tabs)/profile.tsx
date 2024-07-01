import Layout from '@/components/layout';
import { StyledView } from '@/components/styled.tsx';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
    return (
        <Layout>
            <StyledView classname='flex-1 justify-center'>
                <Link
                    push
                    href={'/(screens)/sign_in'}
                >
                    Sign In
                </Link>
            </StyledView>
        </Layout>
    );
}
