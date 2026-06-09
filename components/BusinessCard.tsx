import Link from "next/link";
import Image from "next/image";

interface Props {
    business: string,
    image: string,
    service: string,
    contact: string,
    email: string
}

const BusinessCard = ({business, image, service, contact, email}: Props) => {
    return (
        <Link href={`/business/${business}`} className={"flex flex-col items-center"}>
            <Image src={image} alt={`${business} logo`} className={"mb-4 rounded-lg object-cover"} width={400} height={200} />
            <div className={'p-4 '}>
                <h2 className={"text-xl font-bold mb-2 text-white"}>{business}</h2>
                <p className={"text-gray-400 mb-1"}>{service}</p>
                <p className={"text-gray-400 mb-1"}>{contact}</p>
                <p className={"text-gray-400"}>{email}</p>
            </div>
        </Link>
    )
}
export default BusinessCard
