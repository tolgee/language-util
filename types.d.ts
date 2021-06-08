declare module 'country-flag-emoji' {
    const get: (country: string) => {
        code: string,
        unicode: string,
        name: string,
        emoji: string
    } | undefined
}

declare module 'download-git-repo' {
    export default function download(repo: string, dest: string, opts: { [key: string]: any }, fn: (err: string) => void): void
    export default function download(repo: string, dest: string, fn: (err: string) => void): void
}
