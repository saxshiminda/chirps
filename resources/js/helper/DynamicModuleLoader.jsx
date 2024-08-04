import React, { useState, useEffect } from 'react';

var helper;

const DynamicModuleLoader = ({ params, children }) => {
    // helper:'lists',
    // module:'Chirplist',
    // data:chirpsData,
    const [Module, setModule] = useState(null);

    helper = helper ? helper : params.helper;
    var module = params.module;


    useEffect(() => {
        if (module) {
        // Dynamically import the module
        import(`./${helper}/${module}.jsx`)
            .then((module) => {
                setModule(() => module.default);
            })
            .catch((error) => {
                console.error(`Error importing ${module}:`, error);
            });
        }
    }, [module]);

    var response;

    if(Module) {
        return params.data.param.map( (p, index) => {
            var d = deepCopy(params.data);
            d.param = p;

            return <Module key={index} data={d} />
        });
    } else {
        response = <div>Loading "{module}"...</div>;
    }

    return response;
};


function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        var copy = [];
        for (var i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }
    var copy = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

/**
 * after setting manual helper,
 * module loader will always use this one.
 * unless it is removed using removeHelper.
*/
export const setHelper = (h) => {
    helper = h;
}

export const removeHelper = (h) => {
    helper = null;
}


export default DynamicModuleLoader;
