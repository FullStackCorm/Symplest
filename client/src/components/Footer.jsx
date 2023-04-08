import { GoMarkGithub } from 'react-icons/go';

export default function Footer() {
    return (
        <div className='footer flex items-stretch px-20'>
            <ul className='pt-3'>
                <a href={'https://www.github.com/FullStackCorm'} className='py-2 px-4 text-lg'><GoMarkGithub className='text-2xl'/> Source Code </a>
                <span> | </span>
                <a href={'https://www.twitter.com/FullStackCorm'}>&copy; FullStackCorm</a>
            </ul>
        </div>
        
    )
}