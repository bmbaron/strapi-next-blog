import {router} from "next/client";

const TestSlug = () => {
    return <div>{router.query.slug}</div>
}

export default TestSlug