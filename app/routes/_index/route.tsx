import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getUrlOriginWithPath } from '~/utils';
import styles0 from './route.module.scss';
import { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { authFirebase } from './firebaseConfig';


export const loader = ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(authFirebase, email, password);
            navigate('/Dashboard');
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError('Wrong login or password');
        }
    };

    return (
        <div className={styles0.root}>
            <div className={styles0.container}>
                <h1 className={styles0.header1}>Vacation Manager</h1>
                <div className={styles0.spacer} />
                <input
                    type="text"
                    placeholder="Login"
                    className={styles0['input-style']}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles0.spacer} />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles0['input-style']}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className={styles0.div1}>
                    <button onClick={handleLogin} className={styles0['signin-button']}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = 'Blank Starter';
    const description = 'Welcome to the Blank Starter';
    const imageUrl = 'https://website-starter.com/og-image.png';

    return [
        { title },
        {
            name: 'description',
            content: description,
        },
        {
            tagName: 'link',
            rel: 'canonical',
            href: data?.canonicalUrl,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: imageUrl,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: description,
        },
        {
            name: 'twitter:image',
            content: imageUrl,
        },
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/ico',
        },
    ];
};
