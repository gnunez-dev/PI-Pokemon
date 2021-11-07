import { useState } from 'react';
//import { useDispatch } from 'react-redux';


const useFilter = ( inicial ) => {

    //let dispatch = useDispatch();
    let [filter, setFilter] = useState(inicial);

    /* const handleChange = (e, action, handlePaginate) => {
        e.preventDefault()
        dispatch( action(e.target.value) );
        setFilter(`Filter: ${e.target.value}`);
        handlePaginate(1)
    }
 */

    const handleFilter = (filter) => {

        setFilter(filter);

    }
    return [filter, handleFilter]

}

export default useFilter;