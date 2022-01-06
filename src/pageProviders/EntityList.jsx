import React from 'react';
import PageAccessValidator from "../components/PageAccessValidator";
import PageContainer from "../components/PageContainer";
import EntityListPage from 'pages/EntityList';


const EntityList = () => (
    <PageAccessValidator>
        <PageContainer>
            <EntityListPage />
        </PageContainer>
    </PageAccessValidator>
);

export default EntityList;