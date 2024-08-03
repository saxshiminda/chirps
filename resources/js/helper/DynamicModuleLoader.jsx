import React, { useState, useEffect } from 'react';

const DynamicModuleLoader = ({ address, data, children }) => {
    const [Module, setModule] = useState(null);

    useEffect(() => {
        if (address.module) {
        // Dynamically import the module
        import(`./${address.helper}/${address.module}.jsx`)
            .then((module) => {
                setModule(() => module.default);
            })
            .catch((error) => {
                console.error(`Error importing ${address.module}:`, error);
            });
        }
    }, [address.module]);

    // Render the dynamically imported module if available
    return Module ? <Module data={data}>{children}</Module> : <div>Loading...</div>;
};

export default DynamicModuleLoader;
