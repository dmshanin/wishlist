import { useState, useEffect } from 'react';

export default (id) => {
    const [ result, setResult ] = useState({
        title: null,
        description: null,
        content: {}
    });
    const [ loading, setLoading ] = useState(false);
    const [ hasError, setErrors ] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await fetch(`/api/get-entry?id=${id}`, {
                    method: 'GET',
                });

                console.log('response', response);

                if (response.status !== 200) {
                    throw new Error('Brands were not fetched.');
                }

                const result = await response.json();

                console.log('!!! result', result);

                const { entryId, title, description, content } = result;

                setResult({
                    id: entryId,
                    title,
                    description,
                    content: content.json(),
                });
            } catch (error) {
                setErrors(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return [ result, loading, hasError ];
};
