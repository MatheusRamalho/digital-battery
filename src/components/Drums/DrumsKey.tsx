interface DrumsKeyProps {
    keyLetter: string
}

export const DrumsKey = ({ keyLetter }: DrumsKeyProps) => {
    return (
        <div
            className="drums-key size-20 rounded-lg border border-gray-600 bg-gray-700 text-white transition-colors font-bold text-wite text-4xl flex items-center justify-center"
            data-key={`key${keyLetter.toLowerCase()}`}
        >
            {keyLetter}
        </div>
    )
}
