import React from 'react';
import PageAccessValidator from "../components/PageAccessValidator";
import PageContainer from "../components/PageContainer";
import EntityEditPage from 'pages/EntityEdit';


const EntityEdit = () => (
    <PageAccessValidator>
        <PageContainer>
            <EntityEditPage />
        </PageContainer>
    </PageAccessValidator>
);

export default EntityEdit;