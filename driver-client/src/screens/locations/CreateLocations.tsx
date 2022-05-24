import React from "react";
import { Container } from "../../components/base";
import ConfirmLocations from "../../components/locations/ConfirmLocations";

interface CreateLocationsProps {}

const CreateLocations: React.FC<CreateLocationsProps> = (props) => {
    return (
        <Container>
            <ConfirmLocations {...props}/>
        </Container>
    )
}

export default CreateLocations