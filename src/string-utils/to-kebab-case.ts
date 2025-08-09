export function toKebabCase(fieldName: string) {
    return fieldName
        .replace(/(?<=\p{Ll})(?=\p{Lu})|(?<=\p{L})(?=\p{N})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})/gu, '-')
        .toLowerCase()
}
