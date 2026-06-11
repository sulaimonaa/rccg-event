import Link from "next/link";
import Image from "next/image";
import {FaBuilding, FaEnvelopeOpen, FaUserCircle} from "react-icons/fa";
import {FaPhoneFlip} from "react-icons/fa6";

interface Props {
    business: string,
    image: string,
    service: string,
    contact: string,
    email: string
}

const BusinessCard = ({business, image, service, contact, email}: Props) => {
    return (
        <Link href={`/business/${business}`} className={"flex flex-col items-center bg-cyan-950/20 rounded-b-lg"}>
            <Image src={image} alt={`${business} logo`} className={"mb-4 rounded-lg object-cover bg-white"} width={400} height={200} />
            <div className={'p-4 '}>
                <h2 className={"text-xl font-bold mb-2 text-white flex items-center justify-start gap-2"}><FaUserCircle />{business}</h2>
                <p className={"text-gray-400 mb-1 flex items-center justify-start gap-2"}><FaBuilding /> {service}</p>
                <p className={"text-gray-400 mb-1 flex items-center justify-start gap-2"}><FaPhoneFlip /> {contact}</p>
                <p className={"text-gray-400 flex items-center justify-start gap-2"}><FaEnvelopeOpen /> {email}</p>
            </div>
        </Link>
    )
}
export default BusinessCard
