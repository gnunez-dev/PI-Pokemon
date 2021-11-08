import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from '../../actions/index';
import Container from '../Container/Container';
import Input from "../Input/Input";
import SweetAlert from 'react-bootstrap-sweetalert';
import './Create.css';


const Create = () => {

    let inicialStateFormulario = {
        name: "",
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [] 
    }
    let errorInicialState = {
        name: null,
        image: null,
        hp:null,
        attack:null,
        defense:null,
        speed:null,
        height:null,
        weight:null,
        types:null,
    }
    let [formulario, setFormulario ] = useState(inicialStateFormulario);
    let dispatch = useDispatch();
    let typesPokemons = useSelector( state => state.allTypes ) 
    let [errors, setErrors] = useState(errorInicialState)
    let [errorSubmint, setErrorSubmint] = useState('');
    let [showAlert, setShowAlert] = useState(false)


    let errorValidate = {
        name: {
            condition: formulario.name.length < 3 ,
            msg: 'You must complete this field, it must contain at least 3 letters',
            prev:'',
            next: 'image'
        },
        image: {
            condition: !/^(ftp|http|https):\/\/[^ "]+$/.test(formulario.image),
            msg: 'You must complete this field, it must contain a url',
            prev: 'name',
            next: 'hp'
        },
        hp: {
            condition: formulario.hp < 1,
            msg: 'This field is required, it must have a numeric value',
            prev: 'image',
            next: 'attack'
        },
        attack: {
            condition: formulario.attack < 1,
            msg: 'This field is required, it must have a numeric value',
            prev: 'hp',
            next: 'defense'
        },
        defense: {
            condition: formulario.defense < 1,
            msg: 'This field is required, it must have a numeric value',
            prev: 'attack',
            next: 'speed'
        },
        speed: {
            condition: formulario.speed < 1,
            msg: 'This field is required, it must have a numeric value',
            prev: 'defense',
            next: 'height'
        },
        height: {
            condition: formulario.height < 1,
            msg: 'This field is required, it must have a numeric value',
            prev: 'speed',
            next: 'weight'
        },
        weight: {
            condition: formulario.weight < 1 ,
            msg: 'This field is required, it must have a numeric value',
            prev: 'height',
            next: 'types'
        },
        types: {
            condition: formulario.types.length === 0,
            msg: 'This field is required, you must select at least one type of pokemon',
            prev: 'weight',
            next: ''
        },

    }


    const validate = (formulario, e) => {

        if( !formulario[e.target.name] || errorValidate[e.target.name].condition) {

            errors[e.target.name] = errorValidate[e.target.name].msg
           
        } else {
            errors[e.target.name] = ''
        }

        let prev = errorValidate[e.target.name].prev;
        let next = errorValidate[e.target.name].next;

        if(prev.length > 0 ){

            if( !formulario[prev] || errorValidate[prev].condition ){
                errors[prev] = errorValidate[prev].msg
            } else {
                errors[prev] = ''
            }

        }

        if( next.length > 0 ){

            if( !formulario[next] || errorValidate[next].condition ){
                errors[next] = errorValidate[next].msg
            } else {
                errors[next] = ''
            }
        
        }
       
    }

    const validateSubmint = ( e ) => {
        e.preventDefault();

        let validation = 0;

        for (const key in formulario) {

            if ( typeof formulario[key] === 'array' ) {
                
                if( formulario[key].length === 0 ){
                    errors.types = errorValidate.types.msg
                    validation++;
                } else {
                    errors.types = ''
                }
                
            } else {

                if( !formulario[key] ){
                    errors[key] = errorValidate[key].msg
                    validation++;
                } else {
                    errors[key] = ''
                }

            }

        }

        if( validation === 0 ){

            handleSubmint(e)
            
        } else {
            setErrors(errors);
            setErrorSubmint('Please complete all fields')
        }


    }

    useEffect( () => {
        dispatch( getTypes() )
    }, [dispatch] )

    const handleSubmint = (e) => {
        e.preventDefault();
        dispatch(createPokemon(formulario))
        setFormulario(inicialStateFormulario);
        setShowAlert(true)
    }

    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name] : e.target.value
        })

        validate({
            ...formulario,
            [e.target.name] : e.target.value
        }, e);

        setErrors(errors)

    } 
    
    const handleCheckbox = (e) => {
        if(e.target.checked){
            setFormulario({
                ...formulario,
                types: [...formulario.types, e.target.value]
            })
        }

        validate({
            ...formulario,
            [e.target.name] : e.target.value
        }, e);

        setErrors(errors)

    }

  
    
    return (
        <div className="cont-create">
            <Container>

            <SweetAlert
                show={showAlert}
                title="Created"
                text="El nuevo pokemon ha sido creado con éxito!"
                onConfirm={() => setShowAlert(false)}
            />
                
                <form onSubmit={validateSubmint}>
                    
                    <Input
                        label='Name'
                        type='text'
                        name='name'
                        value={formulario.name}
                        error={errors.name}
                        handleChange={handleChange}
                    />
                    <Input
                        label='Imagen'
                        type='text'
                        name='image'
                        value={formulario.image}
                        error={errors.image}
                        handleChange={handleChange}
                    />
                    <Input
                        label='Life'
                        type='number'
                        name='hp'
                        value={formulario.hp}
                        error={errors.hp}
                        handleChange={handleChange}
                    />
                    <Input
                        label='Attack'
                        type='number'
                        name='attack'
                        value={formulario.attack}
                        error={errors.attack}
                        handleChange={handleChange}
                    />
                
                    <Input
                        label='Defense'
                        type='number'
                        name='defense'
                        value={formulario.defense}
                        error={errors.defense}
                        handleChange={handleChange}
                    />
                
                    <Input
                        label='Speed'
                        type='number'
                        name='speed'
                        value={formulario.speed}
                        error={errors.speed}
                        handleChange={handleChange}
                    />
                    
                    <Input
                        label='Height'
                        type='number'
                        name='height'
                        value={formulario.height}
                        error={errors.height}
                        handleChange={handleChange}
                    />
                    
                    <Input
                        label='Weight'
                        type='number'
                        name='weight'
                        value={formulario.weight}
                        error={errors.weight}
                        handleChange={ handleChange }
                    />
                    

                    <div className='cont-types'>
                        <label>Types</label>
                        {
                            typesPokemons && typesPokemons.map( t => {
                                return (
                                    <label className="item-types">
                                        <input 
                                            type="checkbox"
                                            name="types"
                                            key={t.id}
                                            value={t.id}
                                            onChange={ (e) => handleCheckbox(e) }
                                            />
                                        {t.name}

                                        <br/>
                                    </label>
                                    )
                            })
                        }

                        {
                            errors.types && (
                               <p className='error-form'>{errors.types}</p>
                            )
                        }

                    </div>
                    {
                        errorSubmint && <p className='error-form'>{errorSubmint}</p>
                    }
                    <button className={ errors ? `btn btn-desactive` : `btn btn-act`}>Crear</button>
                </form>
            </Container>
        </div>
    )
}



export default Create;