import React, { useState, useEffect } from 'react';

const DynamicModuleLoader = ({ address, children }) => {
    const [Module, setModule] = useState(null);

    useEffect(() => {
        if (moduleName) {
        // Dynamically import the module
        import(`./${address.helperName}/${address.moduleName}.jsx`)
            .then((module) => {
                setModule(() => module.default);
            })
            .catch((error) => {
                console.error(`Error importing ${moduleName}:`, error);
            });
        }
    }, [moduleName]);

    // Render the dynamically imported module if available
    return Module ? <Module auth={auth} data={} >{children}</Module> : <div>Loading...</div>;
};

export default DynamicModuleLoader;
