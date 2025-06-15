import {ShortenedLinkWidget} from "../widgets/ShortenedLink/ui/ShortenedLink.tsx";

export const ShortenedLinkPage = () => {
    // получение shortUrl из параметров или пропсов
    const shortUrl = 'https://your-short-url.com/abc123';

    return (
        <div>
            <ShortenedLinkWidget shortUrl={shortUrl} />
        </div>
    );
};
