import type { CardIcon } from "../types/card-icon.types"

export default function CardIcon({ name }: { name: CardIcon }) {

    const url = new URL(`/src/assets/icons/card-icons/${name}.svg`, import.meta.url).href
    
    return (
        <img src={url} alt={name} />
    )
}
